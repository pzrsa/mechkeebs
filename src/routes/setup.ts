import router, { Request, Response, Router } from "express";
import { Setup } from "../entity/Setup";

const setupRouter: Router = router();

setupRouter.get("/setups", async (_, res: Response) => {
  const results = await Setup.find({ relations: ["creator"] });

  return res.status(200).json({ results });
});

setupRouter.get("/setups/:id", async (req: Request, res: Response) => {
  const result = await Setup.findOne(req.params.id, {
    relations: ["creator"],
  });

  return res.status(200).json({ result });
});

export default setupRouter;
