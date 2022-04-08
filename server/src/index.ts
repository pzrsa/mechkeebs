import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import fileUpload from "express-fileupload";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { __prod__ } from "./constants";
import postsRouter from "./routers/post";
import usersRouter from "./routers/user";

dotenv.config();

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "parsa",
  password: "parsa",
  database: "mechkeebs",
  synchronize: !__prod__,
  logging: true,
  entities: ["dist/entity/*.js"],
  migrations: ["dist/migrations/*.js"],
});

const main = async () => {
  // @ts-ignore
  const conn = await dataSource.initialize();

  const app: Application = express();

  app.use(
    express.json(),
    fileUpload(),
    cors({ origin: process.env.CORS_ORIGIN, credentials: true }),
    cookieParser(process.env.COOKIE_SECRET)
  );

  app.use("/api", usersRouter, postsRouter);
  app.set("json spaces", 2);

  app.listen(4000, () => {
    console.log("server up on http://localhost:4000");
  });
};

main().catch((err) => console.error(err));
