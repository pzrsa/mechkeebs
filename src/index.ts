import "reflect-metadata";
import { createConnection } from "typeorm";

const main = async () => {
  const conn = await createConnection();
  console.log(conn.isConnected);
};

main().catch((err) => console.error(err));
