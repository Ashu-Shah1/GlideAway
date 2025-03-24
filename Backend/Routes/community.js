import { Router } from "express";
import { blogModel } from "../DataBase/db.js";

const CommunityRouter = Router();

CommunityRouter.get("/allBlogs", async (req, res) => {
  try {
    const blogs = await blogModel.find({}); 
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default CommunityRouter;
