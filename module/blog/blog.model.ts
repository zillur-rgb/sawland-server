import { Schema, model } from "mongoose";
import { IBlog } from "./blog.interface";

export const blogSchema = new Schema<IBlog>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
});

// Creating the model
const Blog = model<IBlog>("Blog", blogSchema);
export default Blog;
