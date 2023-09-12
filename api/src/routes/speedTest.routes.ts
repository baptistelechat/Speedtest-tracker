import express from "express";
import { defaultRoute } from "../controllers/speedTest/defaultRoute.controller";
import { getDataOfToday } from "../controllers/speedTest/day/getDataOfToday.controller";
import { getDataOfSpecificDate } from "../controllers/speedTest/day/getDataOfSpecificDate.controller";
import { getDataOfYesterday } from "../controllers/speedTest/day/getDataOfYesterday.controller";
import { getLastDataOfToday } from "../controllers/speedTest/day/getLastDataOfToday.controller";
import { getDataOfWeek } from "../controllers/speedTest/week/getDataOfWeek.controller";
import { getDataOfCurrentWeek } from "../controllers/speedTest/week/getDataOfCurrentWeek.controller";
import { getDataOfPreviousWeek } from "../controllers/speedTest/week/getDataOfPreviousWeek.controller";

const speedTestRouter = express.Router();

// Default route
speedTestRouter.get("/", defaultRoute);
// GET data of today
speedTestRouter.get("/day/today", getDataOfToday);
// GET last data of today
speedTestRouter.get("/day/last", getLastDataOfToday);
// GET all // GET data of yesterday
speedTestRouter.get("/day/yesterday", getDataOfYesterday);
// GET data of a specific date
speedTestRouter.get("/day/:filename", getDataOfSpecificDate);
// GET data of current week
speedTestRouter.get("/weekend/current", getDataOfCurrentWeek);
// GET data of current week
speedTestRouter.get("/weekend/previous", getDataOfPreviousWeek);
// GET data for a specific week
speedTestRouter.get("/weekend/:weekNumber", getDataOfWeek);

export default speedTestRouter;
