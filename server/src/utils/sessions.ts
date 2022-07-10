import crypto from "crypto";
import { Request, Response } from "express";
import { COOKIE_NAME, __prod__ } from "../constants";
import { Session } from "../entity/Session";

const generateToken = async () => {
  const token = crypto.randomBytes(128).toString("base64url");

  return token;
};

export const createSession = async (res: Response, userId: number) => {
  const existing = await Session.findOne({ where: { user: { id: userId } } });

  if (existing) {
    await Session.delete(userId);
  }

  const { token } = await Session.create({
    token: await generateToken(),
    user: { id: userId },
  }).save();

  return res.cookie(COOKIE_NAME, token, {
    secure: __prod__,
    signed: true,
    httpOnly: true,
    sameSite: "lax",
    domain: __prod__ ? process.env.COOKIE_DOMAIN : undefined,
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
  });
};

export const getSession = async (
  req: Request
): Promise<Session | string | null> => {
  const token = req.signedCookies.token;

  if (!token) {
    return "User not logged in";
  }

  const session = await Session.findOne({
    where: { token: token },
    relations: { user: true },
  });

  return session;
};
