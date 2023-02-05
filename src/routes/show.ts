import express, { Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();

router.get("/api/orders/get", async (req: Request, res: Response) => {
  const orders = await Order.find({});

  if (!orders) {
    return res.send("No orders were found!");
  }

  res.send(orders);
});

export { router as getOrdersRouter };
