import { createConnection } from "typeorm";
import express from "express";

import { Client } from "./entities/Client";
import { Banker } from "./entities/Banker";
import { Transaction } from "./entities/Transaction";
import { createClientRouter } from "./routes/create_client";
import { createBankerRouter } from "./routes/create_banker";
import { createTransactionRouter } from "./routes/create_transaction";
import { connectBankerToClient } from "./routes/connect_banker_to_client";
import { deleteClientRouter } from "./routes/delete_client";
import { fetchClientRouter } from "./routes/fetch_clients";

const app = express();

const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "admin555",
      database: "typeorm",
      entities: [Client, Banker, Transaction],
      synchronize: true,
    });
    console.log("Connected to Postgres");

    app.use(express.json());
    app.use(
      createClientRouter,
      createBankerRouter,
      createTransactionRouter,
      connectBankerToClient,
      deleteClientRouter,
      fetchClientRouter
    );

    app.listen(5000, () => {
      console.log("App running on port " + 5000);
    });
  } catch (error) {
    console.error(error);
    throw new Error("Unable to coneect to DB");
  }
};

main();
