import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import fileUpload from "express-fileupload";
import "reflect-metadata";
import { CORS_ORIGIN } from "./constants";
import { AppDataSource } from "./data-source";
import postsRouter from "./routers/post";
import usersRouter from "./routers/user";

dotenv.config();

const main = async () => {
  await AppDataSource.initialize();

  const app: Application = express();

  app.use(
    express.json(),
    fileUpload(),
    cors({ origin: CORS_ORIGIN, credentials: true }),
    cookieParser(process.env.COOKIE_SECRET)
  );

  app.use(usersRouter, postsRouter);
  app.set("json spaces", 2);

  app.listen(process.env.PORT, () => {
    console.log(`server up on http://localhost:${process.env.PORT}`);
  });
};

main().catch((err) => console.error(err));
