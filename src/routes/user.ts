import router, { Request, Response, Router } from "express";
import { User } from "../entity/User";

const userRouter: Router = router();

userRouter.get("/users", async (_, res: Response) => {
  const results = await User.find({
    select: ["id", "username", "createdAt", "updatedAt"],
    relations: ["setups"],
  });

  return res.status(200).json({ users: results });
});

userRouter.get("/users/:id", async (req: Request, res: Response) => {
  const result = await User.findOne(req.params.id, {
    select: ["id", "username", "createdAt", "updatedAt"],
    relations: ["setups"],
  });

  return res.json({ user: result });
});

export default userRouter;
