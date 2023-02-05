import mongoose from "mongoose";

interface OrderAttr {
  ticketid: string;
  userid: string;
}

interface OrderDoc extends mongoose.Document {
  ticketid: string;
  userid: string;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttr): OrderDoc;
}

const orderSchema = new mongoose.Schema({
  ticketid: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
});

orderSchema.statics.build = (attrs: OrderAttr) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>("orders", orderSchema);

export { Order };
