import { Schema, model } from "mongoose";
import { IUser } from "./users.interface";

export const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  city: String,
  country: String,
  postcode: String,
  role: {
    type: String,
    required: false,
  },
});

const User = model<IUser>("User", userSchema);
export default User;
