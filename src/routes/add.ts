import express, { Request, Response } from "express";
import { Order } from "../models/order";
import { rabbitmqConsumer } from "../rabbitmq/Consumer";

const router = express.Router();

router.post("/api/orders/add", async (req: Request, res: Response) => {
  const { ticketid, userid } = req.body;

  const order = new Order({
    userid,
    ticketid,
  });

  await order.save();

  res.send(order);
});

export { router as addOrderRouter };
