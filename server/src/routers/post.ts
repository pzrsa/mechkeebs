import { Storage } from "@google-cloud/storage";
import router, { Request, Response, Router } from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";
import sharp from "sharp";
import { Post } from "../entity/Post";
import { dataSource } from "../index";
import { getSession } from "../utils/sessions";

const postsRouter: Router = router();

const storage = new Storage({
  keyFilename: path.join(__dirname, "../../gcp-key.json"),
  projectId: "mechkeebs",
});

postsRouter.get("/posts/:id?", async (req: Request, res: Response) => {
  const qb = dataSource
    .createQueryBuilder(Post, "p")
    .leftJoinAndSelect("p.keyboard", "keyboard")
    .leftJoinAndSelect("p.creator", "creator")
    .orderBy("p.createdAt", "DESC");

  if (req.query.limit) {
    try {
      qb.take(parseInt(req.query.limit as string));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
  if (req.query.cursor) {
    try {
      qb.where("p.createdAt < :createdAt", {
        createdAt: parseInt(req.query.cursor as string),
      });
    } catch (err) {
      return res.status(400).json({ error: err.detail });
    }
  }
  if (req.params.id) {
    try {
      qb.where("p.id = :id", {
        id: parseInt(req.params.id as string),
      });

      const result = await qb.getOne();

      return res.status(200).json({ result });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  const result = await qb.getMany();

  return res.status(200).json({
    result,
    nextCursor: result.length ? result[result.length - 1].createdAt : null,
  });
});

postsRouter.post("/posts/create", async (req: Request, res: Response) => {
  const bucket = storage.bucket("mechkeebs");

  try {
    const session = await getSession(req);

    if (typeof session === "string") {
      return res.status(403).json({ error: session });
    }

    if (!req.files) {
      return res.status(403).json({ error: "No file uploaded" });
    }

    const blob = bucket.file((req.files.image as UploadedFile).name);
    const blobStream = blob.createWriteStream({ resumable: false, gzip: true });

    blobStream.on("error", (err) => {
      return res.status(400).json({ error: err.message });
    });

    blobStream.on("finish", async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      const result = await Post.create({
        imageName: (req.files!.image as UploadedFile).name,
        keyboard: {
          name: req.body.keyboardName,
          switches: req.body.keyboardSwitches,
          keycaps: req.body.keyboardKeycaps,
        },
        creatorId: session?.user.id,
      }).save();

      return res.status(200).json({ result, publicUrl });
    });

    blobStream.end(
      await sharp((req.files!.image as UploadedFile).data)
        .jpeg({ quality: 85 })
        .png({ quality: 85 })
        .heif({ quality: 85 })
        .resize({ width: 1920, height: 1080, withoutEnlargement: true })
        .toBuffer()
    );
    return;
  } catch (err) {
    return res.status(400).json({ error: err.detail });
  }
});

postsRouter.put("/posts/update", async (req: Request, res: Response) => {
  try {
    const session = await getSession(req);

    if (typeof session === "string") {
      return res.status(401).json({ error: session });
    }

    const result = await Post.update(
      { id: req.body.setupId, creatorId: session?.user.id },
      {
        keyboard: {
          name: req.body.keyboard.name,
          switches: req.body.keyboard.switches,
          keycaps: req.body.keyboard.keycaps,
        },
      }
    );
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(400).json({ error: err.detail });
  }
});

postsRouter.delete("/posts/delete", async (req: Request, res: Response) => {
  const session = await getSession(req);

  if (typeof session === "string") {
    return res.status(403).json({ error: session });
  }

  await Post.delete({
    id: req.body.postId,
    creatorId: session?.user.id,
  });

  return res.status(200).json(true);
});

export default postsRouter;
