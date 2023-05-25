import { IOrder } from "./orders.interface";
import Order from "./orders.model";

export const getAllOrdersFromDB = async (): Promise<IOrder[]> => {
  const allOrders = Order.find();

  return allOrders;
};
