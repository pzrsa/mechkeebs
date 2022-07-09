import { DataSource } from "typeorm";
import { __prod__ } from "./constants";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: !__prod__,
  logging: !__prod__,
  entities: ["dist/entity/*.js"],
});
