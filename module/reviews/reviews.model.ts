import { Schema, model } from "mongoose";
import { IReview } from "./reviews.interface";

export const reviewSchema = new Schema<IReview>({
  name: {
    type: String,
    required: true,
  },

  city: {
    type: String,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
});

// Creating the model
const Review = model<IReview>("Review", reviewSchema);

export default Review;
