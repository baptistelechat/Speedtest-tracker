import express from "express";
import { getDataOfCurrentMonth } from "../../controllers/speedTest/month/getDataOfCurrentMonth.controller";
import { getDataOfMonth } from "../../controllers/speedTest/month/getDataOfMonth.controller";
import { getDataOfPreviousMonth } from "../../controllers/speedTest/month/getDataOfPreviousMonth.controller";
import { getAverageDataOfCurrentMonth } from "../../controllers/speedTest/month/getAverageDataOfCurrentMonth.controller";
import { getAverageDataOfMonth } from "../../controllers/speedTest/month/getAverageDataOfMonth.controller";
import { getAverageOfPreviousMonth } from "../../controllers/speedTest/month/getAverageOfPreviousMonth.controller";


const speedTestMonthRouter = express.Router();

// GET data for current month
speedTestMonthRouter.get("/current", getDataOfCurrentMonth);
// GET data for previous month
speedTestMonthRouter.get("/previous", getDataOfPreviousMonth);
// GET data for a specific month
speedTestMonthRouter.get("/:monthNumber", getDataOfMonth);
// GET average data of current month
speedTestMonthRouter.get("/current/average", getAverageDataOfCurrentMonth);
// // GET average data of previous month
speedTestMonthRouter.get("/previous/average", getAverageOfPreviousMonth);
// GET average data for a specific month
speedTestMonthRouter.get("/:monthNumber/average", getAverageDataOfMonth);

export default speedTestMonthRouter;
