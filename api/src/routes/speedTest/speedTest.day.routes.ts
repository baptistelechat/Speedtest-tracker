import express from "express";
import { getDataOfToday } from "../../controllers/speedTest/day/getDataOfToday.controller";
import { getDataOfYesterday } from "../../controllers/speedTest/day/getDataOfYesterday.controller";
import { getLastDataOfToday } from "../../controllers/speedTest/day/getLastDataOfToday.controller";
import { getAverageDataOfToday } from "../../controllers/speedTest/day/getAverageDataOfToday.controller";
import { getAverageOfYesterday } from "../../controllers/speedTest/day/getAverageOfYesterday.controller";
import { getAverageDataOfDate } from "../../controllers/speedTest/day/getAverageDataOfDate.controller";
import { getDataOfDate } from "../../controllers/speedTest/day/getDataOfDate.controller";

const speedTestDayRouter = express.Router();

// GET data of today
speedTestDayRouter.get("/today", getDataOfToday);
// GET last data of today
speedTestDayRouter.get("/last", getLastDataOfToday);
// GET all // GET data of yesterday
speedTestDayRouter.get("/yesterday", getDataOfYesterday);
// GET data of a specific date
speedTestDayRouter.get("/:filename", getDataOfDate);
// GET average data of today
speedTestDayRouter.get("/today/average", getAverageDataOfToday);
// GET average data of yesterday
speedTestDayRouter.get("/yesterday/average", getAverageOfYesterday);
// GET average data of a specific date
speedTestDayRouter.get("/:filename/average", getAverageDataOfDate);

export default speedTestDayRouter;
