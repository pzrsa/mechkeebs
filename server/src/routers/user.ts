import * as argon2 from "argon2";
import router, { Request, Response, Router } from "express";
import { User } from "../entity/User";

const userRouter: Router = router();

userRouter.get("/users", async (_, res: Response) => {
  const results = await User.find({
    relations: ["setups"],
  });

  return res.status(200).json({ results });
});

userRouter.get("/users/:id", async (req: Request, res: Response) => {
  const result = await User.findOne(req.params.id, {
    relations: ["setups"],
  });

  return res.status(200).json({ result });
});

userRouter.post("/users/register", async (req: Request, res: Response) => {
  const existingUsername = await User.findOne({
    where: { username: req.body.username },
  });
  if (existingUsername) {
    return res.status(400).json({ error: "Username already taken" });
  }

  const existingEmail = await User.findOne({
    where: { email: req.body.email },
  });
  if (existingEmail) {
    return res.status(400).json({ error: "Email already taken" });
  }

  const { password, ...result } = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: await argon2.hash(req.body.password),
  }).save();

  return res.status(200).json({ result });
});

userRouter.post("/users/login", async (req: Request, res: Response) => {
  const user = await User.findOne({
    where: { username: req.body.username },
    select: ["username", "password"],
  });

  if (!user) {
    return res
      .status(400)
      .json({ error: "Account with that username doesn't exist" });
  }

  const valid = user.password === req.body.password;

  if (!valid) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  return res
    .status(200)
    .json({ result: `User '${user.username}' successfully logged in` });
});

export default userRouter;