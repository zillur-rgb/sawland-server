import { IBlog } from "./blog.interface";
import Blog from "./blog.model";

export const createBlogToDB = async () => {
  const newBlog = new Blog({
    title: "How our saws are different from others?",
    desc: "Our saws come with a integrating metal detector so if you use over the metal it will not be  problemtic for your saw!",
    img: "https://i.ibb.co/LQTxKtp/Improve-Per.png",
  });

  console.log("Blog: ", newBlog);
  await newBlog.save();
  return newBlog;
};

export const getAllBlogsfromDB = async (): Promise<IBlog[]> => {
  const allBlogs = await Blog.find();
  return allBlogs;
};
