import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import fileUpload from "express-fileupload";
import rateLimit from 'express-rate-limit';
import "reflect-metadata";
import { CORS_ORIGIN, __prod__ } from "./constants";
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
    cookieParser(process.env.COOKIE_SECRET),
  );

  __prod__ ? app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    })
  ) : null

  app.use(usersRouter, postsRouter);
  app.set("json spaces", 2);

  app.listen(process.env.PORT, () => {
    console.log(`server up on port ${process.env.PORT}`);
  });
};

main().catch((err) => console.error(err));
