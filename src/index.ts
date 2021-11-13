import express, { Application } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import userRouter from "./routes/user";

const main = async () => {
  // @ts-ignore - initialise db connection here to be fetched later with "getConnection"
  const conn = await createConnection();

  const app: Application = express();

  app.use(express.json());

  app.use("/api", userRouter);

  app.listen(3000, () => {
    console.log("server up on http://localhost:3000");
  });
};

main().catch((err) => console.error(err));
