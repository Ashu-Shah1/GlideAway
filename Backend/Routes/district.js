import { Router } from "express";
import { districtModel } from "../DataBase/db.js";

const districtRouter = Router();

const districts = [
  {
    districtName: "Dehradun",
    state: "Uttarakhand",
    info: "Dehradun is the capital city and the largest city of Uttarakhand...",
    images: [
      "https://1.bp.blogspot.com/--DLj4ilsY_0/X8ShGBpeuDI/AAAAAAAAMsY/6D62_oLWbEQeqC4D_mVodG9V10UMW_KmgCLcBGAsYHQ/s1200/DinPnB1WsAALo6P.jpg",
      "https://www.adotrip.com/public/images/city/master_images/5e3d4045cb808-Dehradun_Attractions.jpg",
      "https://dehraduntourism.co.in/images/places-to-visit/header/ghanta-ghar-clock-tower-dehradun-tourism-entry-fee-timings-holidays-reviews-header.jpg",
    ],
  },
  {
    districtName: "Pauri Garhwal",
    state: "Uttarakhand",
    info: "Pauri Garhwal is a paradise that showcases the varied colors of nature...",
    images: [
      "https://farm6.staticflickr.com/5489/31012380442_4cedc67460_b.jpg",
      "https://assets-news.housing.com/news/wp-content/uploads/2022/09/01172338/PLACES-IN-LANDSDOWN-FEATURE-compressed.jpg",
      "https://www.euttaranchal.com/tourism/photos/pauri-garhwal-71786.jpg",
    ],
  },
  // Add remaining districts here...
];

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
