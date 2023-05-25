import { IReview } from "./reviews.interface";
import Review from "./reviews.model";

// Getting all the reviews
export const getAllReviewsFromDB = async (): Promise<IReview[]> => {
  const allReviews = await Review.find();
  return allReviews;
};

// Posting a new reviews
export const addAReviewToDB = async (payload: IReview): Promise<IReview> => {
  const newReview = new Review(payload);
  await newReview.save();

  return newReview;
};
