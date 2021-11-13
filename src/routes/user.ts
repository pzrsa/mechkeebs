import router, { Response, Router } from "express";
import { User } from "../entity/User";

const userRouter: Router = router();

userRouter.get("/users", async (_, res: Response) => {
  const users = await User.find();

  return res.json({ users: users });
});

export default userRouter;
