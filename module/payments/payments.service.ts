import { IPayment } from "./payments.interface";
import Payment from "./payments.model";

export const getAllPaymentsFromDB = async (): Promise<IPayment[]> => {
  const allPayments = await Payment.find();

  return allPayments;
};
