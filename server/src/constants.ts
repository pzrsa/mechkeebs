import dotenv from "dotenv";
dotenv.config();

export const __prod__ = process.env.NODE_ENV === "production";
export const CORS_ORIGIN = process.env.CORS_ORIGIN;
export const COOKIE_NAME = "token";
export const GCLOUD_BUCKET_NAME = "mechkeebs";
export const STATE = process.env.STATE;
