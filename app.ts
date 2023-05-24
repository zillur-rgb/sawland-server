import express, { Application, Request, Response } from "express";
import cors from "cors";
import { Schema } from "mongoose";

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
  res.send("Hello World");
});

export default app;
