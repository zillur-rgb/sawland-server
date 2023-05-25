import express from "express";
import { addAReview, getAllReviews } from "./reviews.controller";
const router = express.Router();

router.get("/", getAllReviews);
router.post("/", addAReview);

export default router;
