import { Request, Response } from "express";
import { addAReviewToDB, getAllReviewsFromDB } from "./reviews.service";

export const getAllReviews = async (req: Request, res: Response) => {
  const allReviews = await getAllReviewsFromDB();

  res.status(200).json({
    status: 200,
    count: allReviews.length,
    data: allReviews,
  });
};

// Conrtoller for posting a new review

export const addAReview = async (req: Request, res: Response) => {
  const newReview = await addAReviewToDB(req.body);

  res.status(200).json({
    status: 200,
    data: newReview,
  });
};
