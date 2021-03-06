import { Storage } from "@google-cloud/storage";
import router, { Request, Response, Router } from "express";
import { UploadedFile } from "express-fileupload";
import { GCLOUD_BUCKET_NAME } from "../constants";
import { AppDataSource } from "../data-source";
import { Keyboard } from "../entity/Keyboard";
import { Post } from "../entity/Post";
import { getSession } from "../utils/sessions";

const postsRouter: Router = router();

const storage = new Storage({
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS as string),
  projectId: "mechkeebs",
});

postsRouter.get("/posts/:id?", async (req: Request, res: Response) => {
  const qb = AppDataSource.createQueryBuilder(Post, "p")
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
      console.error(err);
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
  const bucket = storage.bucket(GCLOUD_BUCKET_NAME);

  try {
    const session = await getSession(req);

    if (typeof session === "string") {
      return res.status(403).json({ error: session });
    }

    if (!session?.user) {
      return res.status(403).json({ error: session });
    }

    if (!req.files) {
      return res.status(403).json({ error: "No file uploaded" });
    }

    const blob = bucket.file((req.files.image as UploadedFile).name);
    const blobStream = blob.createWriteStream({ resumable: false, gzip: true });

    blobStream.on("error", (err) => {
      console.error(err);
      return res.status(400).json({ error: err.message });
    });

    blobStream.on("finish", async () => {
      const publicUrl = `https://storage.googleapis.com/${GCLOUD_BUCKET_NAME}/${blob.name}`;
      const result = await Post.create({
        imageName: (req.files!.image as UploadedFile).name,
        keyboard: {
          name: req.body.keyboardName,
          switches: req.body.keyboardSwitches,
          keycaps: req.body.keyboardKeycaps,
          soundTestUrl: req.body.keyboardSoundTestUrl,
        },
        creatorId: session?.user.id,
      }).save();

      return res.status(200).json({ result, publicUrl });
    });

    blobStream.end((req.files!.image as UploadedFile).data);

    return;
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.detail });
  }
});

postsRouter.delete("/posts/delete", async (req: Request, res: Response) => {
  const bucket = storage.bucket(GCLOUD_BUCKET_NAME);

  try {
    const session = await getSession(req);

    if (typeof session === "string") {
      return res.status(403).json({ error: session });
    }

    const postToDelete = await Post.findOne({
      where: {
        id: req.body.postId,
        creatorId: session?.user.id,
      },
    });

    if (!postToDelete) {
      return res.status(400).json({ error: "No post to delete" });
    }

    await bucket.file(postToDelete.imageName).delete();

    await Post.delete(postToDelete.id);
    await Keyboard.delete(postToDelete.keyboardId);

    return res.status(200).json(true);
  } catch (err) {
    console.error(err);
    return res.status(400).json(false);
  }
});

export default postsRouter;
