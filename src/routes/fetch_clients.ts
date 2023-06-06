import express from "express";
import { Client } from "../entities/Client";
import { createQueryBuilder } from "typeorm";

const router = express.Router();

router.get("/api/clients", async (req, res) => {
  const clients = await createQueryBuilder("user")
    .select("user.first_name")
    .addSelect("user.last_name")
    .from(Client, "user")
    .where("user.id = :clientId", { clientId: 2 })
    .getOne();

  console.log("clients ", clients);

  return res.json(clients);
});

export { router as fetchClientRouter };
