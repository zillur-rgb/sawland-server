import { ObjectId } from "mongodb";
import { IBlog } from "./blog.interface";
import Blog from "./blog.model";

export const addBlogToDB = async (payload: IBlog): Promise<IBlog> => {
  const newBlog = new Blog(payload);
  console.log("Blog: ", newBlog);
  await newBlog.save();
  return newBlog;
};

export const getAllBlogsfromDB = async (): Promise<IBlog[]> => {
  const allBlogs = await Blog.find();
  return allBlogs;
};

export const getSingleBlogFromDB = async (
  payload: string
): Promise<IBlog | null> => {
  const singleBlog = await Blog.findById({ _id: payload });
  return singleBlog;
};
