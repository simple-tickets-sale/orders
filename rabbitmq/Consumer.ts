import { rabbitmqConnection } from "./Connection";
import { ConsumeMessage } from "amqplib";

interface ConsumerCallback {
  (msg: ConsumeMessage | null): void;
}

export class Consumer {
  async consume(
    consumerCallback: ConsumerCallback,
    exchangeName: string,
    pattern: string
  ) {
    try {
      await rabbitmqConnection.channel.assertExchange(exchangeName, "topic", {
        durable: false,
      });
      const q = await rabbitmqConnection.channel.assertQueue("", {
        exclusive: true,
      });
      await rabbitmqConnection.channel.bindQueue(
        q.queue,
        exchangeName,
        pattern
      );

      rabbitmqConnection.channel.consume(q.queue, consumerCallback, {
        noAck: true,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export const rabbitmqConsumer = new Consumer();
