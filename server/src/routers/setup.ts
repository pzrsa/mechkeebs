import { Storage } from "@google-cloud/storage";
import router, { Request, Response, Router } from "express";
import path from "path";
import { getConnection } from "typeorm";
import { Setup } from "../entity/Setup";
import { getSession } from "../utils/sessions";

const setupRouter: Router = router();

const gcs = new Storage({
  keyFilename: path.join(__dirname, "../../gcp-key.json"),
  projectId: "setupscope",
});

setupRouter.get("/setups", async (req: Request, res: Response) => {
  const qb = getConnection()
    .getRepository(Setup)
    .createQueryBuilder("s")
    .innerJoinAndSelect("s.creator", "u", "u.id = s.creatorId")
    .orderBy("s.createdAt", "DESC");

  if (req.query.limit && req.query.cursor) {
    qb.take(parseInt(req.query.limit as string));
    qb.where("s.createdAt < :cursor", {
      cursor: new Date(parseInt(req.query.cursor as string)),
    });
  }

  if (req.query.id) {
    try {
      const result = await Setup.findOne(parseInt(req.query.id as string));
      return res.status(200).json({ result });
    } catch (err) {
      return res.status(400).json({ error: err.detail });
    }
  }

  const results = await qb.getMany();

  return res.status(200).json({ results });
});

setupRouter.post("/setups/create", async (req: Request, res: Response) => {
  try {
    const result = await Setup.create({
      title: req.body.title,
      items: req.body.items,
      creatorId: req.body.creatorId,
    }).save();

    return res.status(200).json({ result });
  } catch (err) {
    return res.status(400).json({ error: err.detail });
  }
});

setupRouter.put("/setups/update", async (req: Request, res: Response) => {
  try {
    const result = await Setup.update(
      { id: req.body.setupId, creatorId: req.body.creatorId },
      { title: req.body.title, items: req.body.items }
    );
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(400).json({ error: err.detail });
  }
});

setupRouter.delete("/setups/delete", async (req: Request, res: Response) => {
  const session = await getSession(req);

  if (typeof session === "string") {
    return res.status(401).json({ error: session });
  }

  const result = await Setup.delete({
    id: req.body.setupId,
    creatorId: session?.user.id,
  });

  return res.status(200).json({ result });
});

export default setupRouter;
