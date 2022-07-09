import dotenv from "dotenv";
import router, { Request, Response, Router } from "express";
import Client, { auth } from "twitter-api-sdk";
import { COOKIE_NAME, CORS_ORIGIN, STATE } from "../constants";
import { Session } from "../entity/Session";
import { User } from "../entity/User";
import { createSession, getSession } from "../utils/sessions";

dotenv.config();

const authClient = new auth.OAuth2User({
  client_id: process.env.TWITTER_CLIENT_ID as string,
  client_secret: process.env.TWITTER_CLIENT_SECRET as string,
  callback: process.env.CALLBACK_URL as string,
  scopes: ["tweet.read", "users.read"],
});

const client = new Client(authClient);

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
      return res.status(500).json({ error: "State doesn't match" });
    await authClient.requestAccessToken(code as string);

    const twitterData = await client.users.findMyUser({
      "user.fields": ["profile_image_url"],
    });

    const existing = await User.findOne({
      where: { twitterId: twitterData.data!.id },
    });
    if (existing) {
      await createSession(res, existing.id);
      return res.status(200).redirect(CORS_ORIGIN as string);
    }

    const user = await User.create({
      twitterId: twitterData.data!.id,
      twitterUsername: twitterData.data!.username,
      twitterImageUrl: twitterData.data!.profile_image_url,
    }).save();

    await createSession(res, user.id);

    return res.status(200).redirect(CORS_ORIGIN as string);
  } catch (err) {
    console.error(err);
    return res.status(500).redirect(CORS_ORIGIN as string);
  }
});

usersRouter.delete("/users/logout", async (req: Request, res: Response) => {
  await Session.delete({ token: req.signedCookies.token });

  res.clearCookie(COOKIE_NAME);

  return res.status(200).json(true);
});

usersRouter.get("/users/me", async (req: Request, res: Response) => {
  const session = await getSession(req);

  if (typeof session === "string") {
    return res.status(403).json({ error: session });
  }

  return res.status(200).json({ ...session });
});

export default usersRouter;
