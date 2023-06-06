import express from "express";
import { Client } from "../entities/Client";
import { Banker } from "../entities/Banker";

const router = express.Router();

router.put("/api/banker/:bankerId/client/:clientId", async (req, res) => {
  const { clientId, bankerId } = req.params;

  const client = await Client.findOne({
    where: {
      id: +clientId,
    },
  });

  const banker = await Banker.findOne({
    where: {
      id: +bankerId,
    },
  });

  if (!banker && !client) {
    return res.json({
      msg: "banker or client does not exist",
    });
  }
  if (banker && client) {
    banker.clients = [client];

    await banker.save();

    return res.json({
      msg: "client added to banker",
    });
  }

  return res.json({
    msg: "problem adding client to banker",
  });
});

export { router as connectBankerToClient };
