import express, { Application } from "express";
import blogsRoute from "./module/blog/blog.route";
import cors from "cors";

const app: Application = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//All of our routes will be added in here
app.use("/api/v1/blogs", blogsRoute);
export default app;
