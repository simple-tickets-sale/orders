import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { addOrderRouter } from "./routes/add";
import { rabbitmqConnection } from "./rabbitmq/Connection";
import { rabbitmqMessages } from "./rabbitmq/consuming";

const app = express();

app.use(express.json());
app.use(cors());

app.use(addOrderRouter);

app.get("/api/orders/ping", (req, res) => {
  res.send("works!!!");
});

app.all("*", () => {
  throw new Error("4044040404040400404");
});

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("mongoURI wasn't found");
  }

  if (!process.env.RABBITMQ_CONNECTION) {
    throw new Error("rabbitmq URI wasn't found");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    await rabbitmqConnection.connect(process.env.RABBITMQ_CONNECTION);
    await rabbitmqMessages();
  } catch (error) {
    console.error(error);
  }

  app.listen(4001, () => {
    console.log("listening on port 4001");
  });
};

start();
