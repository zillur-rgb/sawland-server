import express, { Application, Request, Response } from "express";
import cors from "cors";
import { Schema, model } from "mongoose";

const app: Application = express();
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  interface IBlog {
    title: string;
    desc: string;
    img?: string;
  }

  const blogSchema = new Schema<IBlog>({
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
  });

  // Creating the model
  const Blog = model<IBlog>("Blog", blogSchema);

  // Sending the data mockdata
  const addBlogToDB = async () => {
    const newBlog = new Blog({
      title: "How our saws are different from others?",
      desc: "Our saws come with a integrating metal detector so if you use over the metal it will not be  problemtic for your saw!",
      img: "https://i.ibb.co/LQTxKtp/Improve-Per.png",
    });

    await newBlog.save();
    console.log("Blog: ", newBlog);
  };
  addBlogToDB();
  res.send("Hello World");
});

export default app;
