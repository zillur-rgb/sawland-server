import { Request, Response } from "express";
import {
  addBlogToDB,
  getAllBlogsfromDB,
  getSingleBlogFromDB,
} from "./blog.service";

export const addBlog = async (req: Request, res: Response) => {
  const blog = await addBlogToDB(req.body);

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
    total: allBlogs.length,
  });
};

export const getSingleBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const singleBlog = await getSingleBlogFromDB(id);
  console.log("singleBlog", singleBlog);
  res.status(200).json({
    status: 200,
    data: singleBlog,
  });
  return singleBlog;
};
