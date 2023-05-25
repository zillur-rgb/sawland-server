import { Schema, model } from "mongoose";
import { ITools } from "./tools.interface";

export const toolScehma = new Schema<ITools>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  BestFor: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  sold: {
    type: Number,
    required: false,
  },
});

const Tool = model<ITools>("Tool", toolScehma);
export default Tool;
