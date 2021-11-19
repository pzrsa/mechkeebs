import crypto from "crypto";
import { Response } from "express";
import { __prod__ } from "../constants";
import { Session } from "../entity/Session";

const generateToken = async () => {
  const token = crypto.randomBytes(128).toString("base64url");

  return token;
};

export const createSession = async (res: Response, userId: number) => {
  const { token } = await Session.create({
    token: await generateToken(),
    userId: userId,
  }).save();

  return res.cookie("token", token, {
    secure: __prod__,
    signed: true,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
  });
};
