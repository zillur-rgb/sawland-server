import { Request, Response } from "express";
import { getAllOrdersFromDB } from "./orders.service";

// Retrieving all orders
export const getAllOrders = async (req: Request, res: Response) => {
  const allOrders = await getAllOrdersFromDB();

  res.status(200).json({
    status: 200,
    data: allOrders,
    count: allOrders.length,
  });
};
