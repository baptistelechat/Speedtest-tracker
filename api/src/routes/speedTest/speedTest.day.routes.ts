import express from "express";
import { getDataOfSpecificDate } from "../../controllers/speedTest/day/getDataOfSpecificDate.controller";
import { getDataOfToday } from "../../controllers/speedTest/day/getDataOfToday.controller";
import { getDataOfYesterday } from "../../controllers/speedTest/day/getDataOfYesterday.controller";
import { getLastDataOfToday } from "../../controllers/speedTest/day/getLastDataOfToday.controller";

const speedTestDayRouter = express.Router();

// GET data of today
speedTestDayRouter.get("/today", getDataOfToday);
// GET last data of today
speedTestDayRouter.get("/last", getLastDataOfToday);
// GET all // GET data of yesterday
speedTestDayRouter.get("/yesterday", getDataOfYesterday);
// GET data of a specific date
speedTestDayRouter.get("/:filename", getDataOfSpecificDate);

export default speedTestDayRouter;
