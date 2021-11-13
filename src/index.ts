import express, { Application } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";

const main = async () => {
  const conn = await createConnection();
  const app: Application = express();

  console.log(conn.isConnected);

  app.listen(3000, () => {
    console.log("server up on http://localhost:3000");
  });
};

main().catch((err) => console.error(err));
