import express from "express";
import { createBlog, getAllBlogs } from "./blog.controller";

const router = express.Router();

router.get("/", getAllBlogs);

export default router;
