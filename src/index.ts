import "reflect-metadata";
import { createConnection } from "typeorm";

createConnection()
  .then(async (connection) => {
    console.log(connection.isConnected);
  })
  .catch((error) => console.log(error));
