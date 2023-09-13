import express from "express";

import { getDataOfDate } from "../../controllers/speedTest/day/base/getDataOfDate.controller";
import { getAverageDataOfDate } from "../../controllers/speedTest/day/average/getAverageDataOfDate.controller";
import { getAverageDataOfToday } from "../../controllers/speedTest/day/average/getAverageDataOfToday.controller";
import { getAverageDataOfYesterday } from "../../controllers/speedTest/day/average/getAverageDataOfYesterday.controller";
import { getDataOfToday } from "../../controllers/speedTest/day/base/getDataOfToday.controller";
import { getDataOfYesterday } from "../../controllers/speedTest/day/base/getDataOfYesterday.controller";
import { getLastDataOfToday } from "../../controllers/speedTest/day/base/getLastDataOfToday.controller";
import { getMaxDataOfToday } from "../../controllers/speedTest/day/max/getMaxDataOfToday.controller";
import { getMaxDataOfYesterday } from "../../controllers/speedTest/day/max/getMaxDataOfYesterday.controller";
import { getMaxDataOfDate } from "../../controllers/speedTest/day/max/getMaxDataOfDate.controller";

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
speedTestDayRouter.get("/yesterday/average", getAverageDataOfYesterday);
// GET average data of a specific date
speedTestDayRouter.get("/:filename/average", getAverageDataOfDate);
// GET max data of today
speedTestDayRouter.get("/today/max", getMaxDataOfToday);
// GET max data of yesterday
speedTestDayRouter.get("/yesterday/max", getMaxDataOfYesterday);
// GET max data of a specific date
speedTestDayRouter.get("/:filename/max", getMaxDataOfDate);

export default speedTestDayRouter;
