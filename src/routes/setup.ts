import router, { Response, Router } from "express";
import { getRepository } from "typeorm";
import { Setup } from "../entity/Setup";

const setupRouter: Router = router();

setupRouter.get("/setups", async (_, res: Response) => {
  const results = await getRepository(Setup)
    .createQueryBuilder()
    .loadAllRelationIds()
    .getMany();

  return res.status(200).json({ results });
});

export default setupRouter;
