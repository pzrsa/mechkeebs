import dotenv from "dotenv";
import router, { Request, Response, Router } from "express";
import { auth } from "twitter-api-sdk";
import { COOKIE_NAME, CORS_ORIGIN, STATE } from "../constants";
import { Session } from "../entity/Session";
import { getSession } from "../utils/sessions";

dotenv.config();

const authClient = new auth.OAuth2User({
  client_id: process.env.TWITTER_CLIENT_ID as string,
  client_secret: process.env.TWITTER_CLIENT_SECRET as string,
  callback: process.env.CALLBACK_URL as string,
  scopes: ["users.read"],
});

const usersRouter: Router = router();

usersRouter.get("/twitter/login", async (_: Request, res: Response) => {
  const authUrl = authClient.generateAuthURL({
    state: STATE as string,
    code_challenge_method: "s256",
  });

  return res.status(200).json({ result: authUrl });
});

usersRouter.get("/twitter/callback", async (req: Request, res: Response) => {
  try {
    const { code, state } = req.query;
    if (state !== STATE)
      return res.status(500).json({ error: "State isn't matching" });
    await authClient.requestAccessToken(code as string);

    return res.status(200).redirect(CORS_ORIGIN as string);
  } catch (error) {
    return res.status(400).json({ error: error.error });
  }
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
