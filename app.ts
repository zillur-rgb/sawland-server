import express, { Application } from "express";
import blogsRoute from "./module/blog/blog.route";
import toolsRoute from "./module/tools/tools.route";
import reviewsRoute from "./module/reviews/reviews.route";
import ordersRoute from "./module/orders/orders.route";
import cors from "cors";

const app: Application = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//All of our routes will be added in here
app.use("/api/v1/blogs", blogsRoute);
app.use("/api/v1/tools", toolsRoute);
app.use("/api/v1/reviews", reviewsRoute);
app.use("/api/v1/orders", ordersRoute);
export default app;
