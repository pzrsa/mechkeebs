import router, { Request, Response, Router } from "express";
import { getConnection } from "typeorm";
import { Setup } from "../entity/Setup";
import { getSession } from "../utils/sessions";

const setupRouter: Router = router();

setupRouter.get(
  "/setups/:limit/:cursor?",
  async (req: Request, res: Response) => {
    const qb = getConnection()
      .getRepository(Setup)
      .createQueryBuilder("s")
      .innerJoinAndSelect("s.creator", "u", "u.id = s.creatorId")
      .take(parseInt(req.params.limit))
      .orderBy("s.createdAt", "DESC");

    if (req.params.cursor) {
      qb.where("s.createdAt < :cursor", {
        cursor: new Date(parseInt(req.params.cursor)),
      });
    }

    const results = await qb.getMany();

    return res.status(200).json({ results });
  }
);

// setupRouter.get("/setups/:id", async (req: Request, res: Response) => {
//   const result = await Setup.findOne(req.params.id);

//   return res.status(200).json({ result });
// });

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
  const session = await getSession(req);

  if (typeof session === "string") {
    return res.status(401).json({ error: session });
  }

  const result = await Setup.delete({
    id: req.body.postId,
    creatorId: session?.user.id,
  });

  return res.status(200).json({ result });
});

export default setupRouter;
