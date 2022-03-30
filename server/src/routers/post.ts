import router, { Request, Response, Router } from "express";
import { Post } from "../entity/Post";
import { getSession } from "../utils/sessions";

const postRouter: Router = router();

postRouter.get("/posts", async (_: Request, res: Response) => {
  const result = await Post.find({ order: { createdAt: "DESC" } });

  return res.status(200).json({ result });
});

postRouter.post("/posts/create", async (req: Request, res: Response) => {
  try {
    const session = await getSession(req);

    if (typeof session === "string") {
      return res.status(403).json({ error: session });
    }

    const result = await Post.create({
      title: req.body.title,
      // dummy for now until i sort out image handling
      imageName: "image.png",
      items: JSON.parse(req.body.items),
      creatorId: session?.user.id,
    }).save();

    return res.status(200).json({ result });
  } catch (err) {
    return res.status(400).json({ error: err.detail });
  }
});

postRouter.put("/posts/update", async (req: Request, res: Response) => {
  try {
    const session = await getSession(req);

    if (typeof session === "string") {
      return res.status(401).json({ error: session });
    }

    const result = await Post.update(
      { id: req.body.setupId, creatorId: session?.user.id },
      { title: req.body.title, items: req.body.items }
    );
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(400).json({ error: err.detail });
  }
});

postRouter.delete("/posts/delete", async (req: Request, res: Response) => {
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

export default postRouter;
