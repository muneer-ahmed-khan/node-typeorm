import express from "express";
import { Transaction, TransactionTypes } from "../entities/Transaction";
import { Client } from "../entities/Client";

const router = express.Router();

router.post("/api/client/:clientId/transaction", async (req, res) => {
  const { clientId } = req.params;

  const { type, amount } = req.body;

  const client = await Client.findOne({
    where: {
      id: Number(clientId),
    },
  });

  if (!client) {
    return res.json({
      msg: "client not found",
    });
  }

  const transaction = Transaction.create({
    type,
    amount,
    client,
  });

  await transaction.save();

  if (type === TransactionTypes.DEPOSIT) {
    client.balance = client.balance + amount;
  } else if (type === TransactionTypes.WITHDRAW) {
    client.balance = client.balance - amount;
  }

  await client.save();

  return res.json({
    msg: "transaction added",
  });
});

export { router as createTransactionRouter };
