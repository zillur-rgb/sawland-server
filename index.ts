import mongoose from "mongoose";
import app from "./app";

require("dotenv").config();

const PORT: number | string = process.env.PORT || 5000;

// Database connection
async function bootstrap() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hordi.mongodb.net/sawland-db?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    console.log(`MongoDB connected to port ${PORT}`);
  } catch (error) {
    console.log("Connection error");
  }
}

bootstrap();
