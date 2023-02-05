import express, { Request, Response } from "express";
import { Order } from "../models/order";
import { rabbitmqConsumer } from "../../rabbitmq/Consumer";

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

const rabbitmqMessages = async () => {
  await rabbitmqConsumer.consume(
    async (msg) => {
      const { userid, ticketid } = JSON.parse(msg!.content.toString());

      const order = new Order({ userid, ticketid });

      try {
        await order.save();
        console.log(order);
      } catch (error) {
        console.error(error);
      }
    },
    "order",
    "order.#"
  );
};

rabbitmqMessages();

export { router as addOrderRouter };
