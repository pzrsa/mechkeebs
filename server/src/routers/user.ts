import * as argon2 from "argon2";
import router, { Request, Response, Router } from "express";
import { COOKIE_NAME } from "../constants";
import { Session } from "../entity/Session";
import { User } from "../entity/User";
import { createSession, getSession } from "../utils/sessions";

const usersRouter: Router = router();

usersRouter.post("/users/register", async (req: Request, res: Response) => {
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

  await createSession(res, result.id);

  return res.status(200).json({ result });
});

usersRouter.post("/users/login", async (req: Request, res: Response) => {
  const user = await User.findOne({
    where: { email: req.body.email },
    select: ["id", "email", "password"],
  });

  if (!user) {
    return res
      .status(400)
      .json({ error: "Account with that email doesn't exist" });
  }

  const valid = await argon2.verify(user.password, req.body.password);

  if (!valid) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  await createSession(res, user.id);

  return res.status(200).json({ result: "User logged in" });
});

usersRouter.delete("/users/logout", async (req: Request, res: Response) => {
  await Session.delete({ token: req.signedCookies.token });

  res.clearCookie(COOKIE_NAME);

  return res.status(200).json(true);
});

usersRouter.get("/users/me", async (req: Request, res: Response) => {
  const result = await getSession(req);

  if (typeof result === "string") {
    return res.status(403).json({ error: result });
  }

  return res.status(200).json({ ...result });
});

export default usersRouter;
