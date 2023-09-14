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
import { getMinDataOfDate } from "../../controllers/speedTest/day/min/getMinDataOfDate.controller";
import { getMinDataOfToday } from "../../controllers/speedTest/day/min/getMinDataOfToday.controller";
import { getMinDataOfYesterday } from "../../controllers/speedTest/day/min/getMinDataOfYesterday.controller";
import { getQ1DataOfDate } from "../../controllers/speedTest/day/q1/getQ1DataOfDate.controller";
import { getQ1DataOfToday } from "../../controllers/speedTest/day/q1/getQ1DataOfToday.controller";
import { getQ1DataOfYesterday } from "../../controllers/speedTest/day/q1/getQ1DataOfYesterday.controller";
import { getQ3DataOfDate } from "../../controllers/speedTest/day/q3/getQ3DataOfDate.controller";
import { getQ3DataOfToday } from "../../controllers/speedTest/day/q3/getQ3DataOfToday.controller";
import { getQ3DataOfYesterday } from "../../controllers/speedTest/day/q3/getQ3DataOfYesterday.controller";
import { getMedianDataOfToday } from "../../controllers/speedTest/day/median/getMedianDataOfToday.controller";
import { getMedianDataOfYesterday } from "../../controllers/speedTest/day/median/getMedianDataOfYesterday.controller";
import { getMedianDataOfDate } from "../../controllers/speedTest/day/median/getMedianDataOfDate.controller";

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
// GET min data of today
speedTestDayRouter.get("/today/min", getMinDataOfToday);
// GET min data of yesterday
speedTestDayRouter.get("/yesterday/min", getMinDataOfYesterday);
// GET min data of a specific date
speedTestDayRouter.get("/:filename/min", getMinDataOfDate);
// GET Q1 data of today
speedTestDayRouter.get("/today/q1", getQ1DataOfToday);
// GET Q1 data of yesterday
speedTestDayRouter.get("/yesterday/q1", getQ1DataOfYesterday);
// GET Q1 data of a specific date
speedTestDayRouter.get("/:filename/q1", getQ1DataOfDate);
// GET Q3 data of today
speedTestDayRouter.get("/today/q3", getQ3DataOfToday);
// GET Q3 data of yesterday
speedTestDayRouter.get("/yesterday/q3", getQ3DataOfYesterday);
// GET Q3 data of a specific date
speedTestDayRouter.get("/:filename/q3", getQ3DataOfDate);
// GET median data of today
speedTestDayRouter.get("/today/median", getMedianDataOfToday);
// GET median data of yesterday
speedTestDayRouter.get("/yesterday/median", getMedianDataOfYesterday);
// GET median data of a specific date
speedTestDayRouter.get("/:filename/median", getMedianDataOfDate);

export default speedTestDayRouter;
