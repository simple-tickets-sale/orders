import { rabbitmqConnection } from "./Connection";

export class Publisher {
  async publish(message: string, exchangeName: string, routingKey: string) {
    try {
      await rabbitmqConnection.channel.assertExchange(exchangeName, "topic", {
        durable: false,
      });
      rabbitmqConnection.channel.publish(
        exchangeName,
        routingKey,
        Buffer.from(message)
      );
    } catch (error) {
      console.error(error);
    }
  }
}

export const publish = new Publisher();
