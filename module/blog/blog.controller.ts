import { Request, Response } from "express";
import { createBlogToDB, getAllBlogsfromDB } from "./blog.service";

export const createBlog = async (req: Request, res: Response) => {
  const blog = await createBlogToDB();

  res.status(200).json({
    status: "success",
    data: blog,
  });
};

export const getAllBlogs = async (req: Request, res: Response) => {
  const allBlogs = await getAllBlogsfromDB();
  res.status(200).json({
    status: 200,
    data: allBlogs,
  });
};
