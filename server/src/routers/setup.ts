import router, { Request, Response, Router } from "express";
import { Setup } from "../entity/Setup";
import { getSession } from "../utils/sessions";

const setupRouter: Router = router();

setupRouter.get("/setups", async (_: Request, res: Response) => {
  const result = await Setup.find({ order: { createdAt: "DESC" } });

  return res.status(200).json({ result });
});

setupRouter.post("/setups/create", async (req: Request, res: Response) => {
  try {
    const session = await getSession(req);

    if (typeof session === "string") {
      return res.status(403).json({ error: session });
    }

    const result = await Setup.create({
      title: req.body.title,
      // dummy for now until i sort out image handling
      imageName: "setup.png",
      items: JSON.parse(req.body.items),
      creatorId: session?.user.id,
    }).save();

    return res.status(200).json({ result });
  } catch (err) {
    return res.status(400).json({ error: err.detail });
  }
});

setupRouter.put("/setups/update", async (req: Request, res: Response) => {
  try {
    const session = await getSession(req);

    if (typeof session === "string") {
      return res.status(401).json({ error: session });
    }

    const result = await Setup.update(
      { id: req.body.setupId, creatorId: session?.user.id },
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
    return res.status(403).json({ error: session });
  }

  await Setup.delete({
    id: req.body.setupId,
    creatorId: session?.user.id,
  });

  return res.status(200).json(true);
});

export default setupRouter;
