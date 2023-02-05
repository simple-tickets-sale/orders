import { rabbitmqConsumer } from "./Consumer";
import { Order } from "../models/order";

export const rabbitmqMessages = async () => {
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
