import express, { Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();

router.post("/api/orders/add", async (req: Request, res: Response) => {
  const { ticketid, userid } = req.body;

  const order = Order.build({
    userid,
    ticketid,
  });

  await order.save();

  res.send(order);
});

export { router as addOrderRouter };
