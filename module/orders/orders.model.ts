import { Schema, model } from "mongoose";
import { IOrder } from "./orders.interface";

export const orderSchema = new Schema<IOrder>({
  name: String,
  email: String,
  quantity: String,
  city: {
    type: String,
    required: false,
  },
  postcode: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  total: Number,
  toolName: String,
  paid: {
    type: Boolean,
    required: false,
  },
  transactionId: {
    type: String,
    required: false,
  },
});

const Order = model<IOrder>("Order", orderSchema);

export default Order;
