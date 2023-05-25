import express from "express";
import { addBlog, getAllBlogs, getSingleBlog } from "./blog.controller";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getSingleBlog);
router.post("/", addBlog);

export default router;
