import { Schema, model } from "mongoose";
import { IPayment } from "./payments.interface";

export const paymentSchema = new Schema<IPayment>({
  id: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
});

const Payment = model<IPayment>("Payment", paymentSchema);
export default Payment;
