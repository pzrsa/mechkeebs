import router, { Request, Response, Router } from "express";
import { Post } from "../entity/Post";
import { getSession } from "../utils/sessions";

const postsRouter: Router = router();

postsRouter.get("/posts", async (_: Request, res: Response) => {
  const result = await Post.find({
    relations: { keyboard: true, creator: true },
    select: ["id", "imageName", "creator", "keyboard", "createdAt"],
    order: { createdAt: "DESC" },
  });

  return res.status(200).json({ result });
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
        name: req.body.keyboard.name,
        switches: req.body.keyboard.switches,
        keycaps: req.body.keyboard.keycaps,
        stabilizers: req.body.keyboard.stabilizers,
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
          stabilizers: req.body.keyboard.stabilizers,
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
    id: req.body.setupId,
    creatorId: session?.user.id,
  });

  return res.status(200).json(true);
});

export default postsRouter;
