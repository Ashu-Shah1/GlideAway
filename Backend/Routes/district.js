import { Router } from "express";
import { districtModel } from "../DataBase/db.js";

const districtRouter = Router();

districtRouter.post("/", async (req, res) => {
  try {
    await districtModel.insertMany(districts);
    res.status(200).json({ message: "Districts added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error inserting data", error });
  }
});

export default districtRouter;
