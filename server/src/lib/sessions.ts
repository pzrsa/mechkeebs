import crypto from "crypto";
import { Session } from "../entity/Session";

const generateToken = async () => {
  const token = crypto.randomBytes(128).toString("base64url");

  return token;
};

export const createSession = async (userId: number) => {
  return await Session.create({
    token: await generateToken(),
    userId: userId,
  }).save();
};
