import express from "express";

import { getAverageDataOfCurrentMonth } from "../../controllers/speedTest/month/average/getAverageDataOfCurrentMonth.controller";
import { getAverageDataOfMonth } from "../../controllers/speedTest/month/average/getAverageDataOfMonth.controller";
import { getAverageOfPreviousMonth } from "../../controllers/speedTest/month/average/getAverageOfPreviousMonth.controller";
import { getDataOfCurrentMonth } from "../../controllers/speedTest/month/base/getDataOfCurrentMonth.controller";
import { getDataOfMonth } from "../../controllers/speedTest/month/base/getDataOfMonth.controller";
import { getDataOfPreviousMonth } from "../../controllers/speedTest/month/base/getDataOfPreviousMonth.controller";
import { getMaxDataOfCurrentMonth } from "../../controllers/speedTest/month/max/getMaxDataOfCurrentMonth.controller";
import { getMaxDataOfMonth } from "../../controllers/speedTest/month/max/getMaxDataOfMonth.controller";
import { getMaxDataOfPreviousMonth } from "../../controllers/speedTest/month/max/getMaxDataOfPreviousMonth.controller";
import { getMinDataOfCurrentMonth } from "../../controllers/speedTest/month/min/getMinDataOfCurrentMonth.controller";
import { getMinDataOfMonth } from "../../controllers/speedTest/month/min/getMinDataOfMonth.controller";
import { getMinDataOfPreviousMonth } from "../../controllers/speedTest/month/min/getMinDataOfPreviousMonth.controller";
import { getQ1DataOfCurrentMonth } from "../../controllers/speedTest/month/q1/getQ1DataOfCurrentMonth.controller";
import { getQ1DataOfMonth } from "../../controllers/speedTest/month/q1/getQ1DataOfMonth.controller";
import { getQ1DataOfPreviousMonth } from "../../controllers/speedTest/month/q1/getQ1DataOfPreviousMonth.controller";

const speedTestMonthRouter = express.Router();

// GET data for current month
speedTestMonthRouter.get("/current", getDataOfCurrentMonth);
// GET data for previous month
speedTestMonthRouter.get("/previous", getDataOfPreviousMonth);
// GET data for a specific month
speedTestMonthRouter.get("/:monthNumber", getDataOfMonth);
// GET average data of current month
speedTestMonthRouter.get("/current/average", getAverageDataOfCurrentMonth);
// GET average data of previous month
speedTestMonthRouter.get("/previous/average", getAverageOfPreviousMonth);
// GET average data for a specific month
speedTestMonthRouter.get("/:monthNumber/average", getAverageDataOfMonth);
// GET max data of current month
speedTestMonthRouter.get("/current/max", getMaxDataOfCurrentMonth);
// GET max data of previous month
speedTestMonthRouter.get("/previous/max", getMaxDataOfPreviousMonth);
// GET max data for a specific month
speedTestMonthRouter.get("/:monthNumber/max", getMaxDataOfMonth);
// GET min data of current month
speedTestMonthRouter.get("/current/min", getMinDataOfCurrentMonth);
// GET min data of previous month
speedTestMonthRouter.get("/previous/min", getMinDataOfPreviousMonth);
// GET min data for a specific month
speedTestMonthRouter.get("/:monthNumber/min", getMinDataOfMonth);
// GET Q1 data of current month
speedTestMonthRouter.get("/current/q1", getQ1DataOfCurrentMonth);
// GET Q1 data of previous month
speedTestMonthRouter.get("/previous/q1", getQ1DataOfPreviousMonth);
// GET Q1 data for a specific month
speedTestMonthRouter.get("/:monthNumber/q1", getQ1DataOfMonth);

export default speedTestMonthRouter;
