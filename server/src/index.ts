import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import fileUpload from "express-fileupload";
import "reflect-metadata";
import { createConnection } from "typeorm";
import setupRouter from "./routers/setup";
import userRouter from "./routers/user";

const main = async () => {
  // @ts-ignore - initialise db connection here to be fetched later with "getConnection"
  const conn = await createConnection();

  const app: Application = express();

  app.use(
    express.json(),
    fileUpload(),
    cors({ origin: process.env.CORS_ORIGIN, credentials: true }),
    cookieParser(process.env.COOKIE_SECRET)
  );

  app.use("/api", userRouter, setupRouter);

  app.set("json spaces", 2);

  app.listen(4000, () => {
    console.log("server up on http://localhost:4000");
  });
};

main().catch((err) => console.error(err));
