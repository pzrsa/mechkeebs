import router, { Request, Response, Router } from "express";
import { Post } from "../entity/Post";
import { dataSource } from "../index";
import { getSession } from "../utils/sessions";

const postsRouter: Router = router();

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
  try {
    const session = await getSession(req);

    if (typeof session === "string") {
      return res.status(403).json({ error: session });
    }

    const result = await Post.create({
      // dummy for now
      imageName: "image.png",
      keyboard: {
        name: req.body.keyboardName,
        switches: req.body.keyboardSwitches,
        keycaps: req.body.keyboardKeycaps,
      },
      creatorId: session?.user.id,
    }).save();

    return res.status(200).json({ result });
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
