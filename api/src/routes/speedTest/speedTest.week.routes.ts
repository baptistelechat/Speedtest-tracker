import express from "express";
import { getDataOfCurrentWeek } from "../../controllers/speedTest/week/getDataOfCurrentWeek.controller";
import { getDataOfPreviousWeek } from "../../controllers/speedTest/week/getDataOfPreviousWeek.controller";
import { getDataOfWeek } from "../../controllers/speedTest/week/getDataOfWeek.controller";
import { getAverageDataOfCurrentWeek } from "../../controllers/speedTest/week/getAverageDataOfCurrentWeek.controller";
import { getAverageDataOfPreviousWeek } from "../../controllers/speedTest/week/getAverageDataOfPreviousWeek.controller";
import { getAverageDataOfWeek } from "../../controllers/speedTest/week/getAverageDataOfWeek.controller";

const speedTestWeekRouter = express.Router();

// GET data of current week
speedTestWeekRouter.get("/current", getDataOfCurrentWeek);
// GET data of previous week
speedTestWeekRouter.get("/previous", getDataOfPreviousWeek);
// GET data for a specific week
speedTestWeekRouter.get("/:weekNumber", getDataOfWeek);
// GET average data of current week
speedTestWeekRouter.get("/current/average", getAverageDataOfCurrentWeek);
// // // GET average data of previous week
speedTestWeekRouter.get("/previous/average", getAverageDataOfPreviousWeek);
// // GET average data for a specific week
speedTestWeekRouter.get("/:weekNumber/average", getAverageDataOfWeek);

export default speedTestWeekRouter;
