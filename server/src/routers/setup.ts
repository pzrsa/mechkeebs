import router, { Request, Response, Router } from "express";
import { Setup } from "../entity/Setup";

const setupRouter: Router = router();

setupRouter.get("/setups", async (_, res: Response) => {
  const results = await Setup.find({
    order: { createdAt: "DESC" },
    relations: ["creator"],
  });

  return res.status(200).json({ results });
});

setupRouter.get("/setups/:id", async (req: Request, res: Response) => {
  const result = await Setup.findOne(req.params.id);

  return res.status(200).json({ result });
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

setupRouter.put("/setups/:id", async (req: Request, res: Response) => {
  const setup = await Setup.findOne(req.params.id);

  if (!setup) {
    return res.status(400).json({ error: "Setup does not exist to update" });
  }

  await Setup.update(req.params.id, req.body);
  return res
    .status(200)
    .json({ result: `Setup ${setup.id} successfully updated` });
});

setupRouter.delete("/setups/delete", async (req: Request, res: Response) => {
  const result = await Setup.delete({
    id: req.body.id,
    creatorId: req.body.creatorId,
  });

  return res.status(200).json({ result });
});

export default setupRouter;
