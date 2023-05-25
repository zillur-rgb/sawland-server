import { Request, Response } from "express";
import { getAllPaymentsFromDB } from "./payments.service";
export const getAllPayments = async (req: Request, res: Response) => {
  const allPayments = await getAllPaymentsFromDB();

  res.status(200).json({
    status: 200,
    data: allPayments,
    count: allPayments.length,
  });
};
