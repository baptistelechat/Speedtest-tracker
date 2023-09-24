import express from "express";

import { getAverageDataOfCurrentWeek } from "../../controllers/speedTest/week/average/getAverageDataOfCurrentWeek.controller";
import { getAverageDataOfPreviousWeek } from "../../controllers/speedTest/week/average/getAverageDataOfPreviousWeek.controller";
import { getAverageDataOfWeek } from "../../controllers/speedTest/week/average/getAverageDataOfWeek.controller";
import { getDataOfCurrentWeek } from "../../controllers/speedTest/week/base/getDataOfCurrentWeek.controller";
import { getDataOfPreviousWeek } from "../../controllers/speedTest/week/base/getDataOfPreviousWeek.controller";
import { getDataOfWeek } from "../../controllers/speedTest/week/base/getDataOfWeek.controller";
import { getMaxDataOfCurrentWeek } from "../../controllers/speedTest/week/max/getMaxDataOfCurrentWeek.controller";
import { getMaxDataOfPreviousWeek } from "../../controllers/speedTest/week/max/getMaxDataOfPreviousWeek.controller";
import { getMaxDataOfWeek } from "../../controllers/speedTest/week/max/getMaxDataOfWeek.controller";
import { getMinDataOfCurrentWeek } from "../../controllers/speedTest/week/min/getMinDataOfCurrentWeek.controller";
import { getMinDataOfPreviousWeek } from "../../controllers/speedTest/week/min/getMinDataOfPreviousWeek.controller";
import { getMinDataOfWeek } from "../../controllers/speedTest/week/min/getMinDataOfWeek.controller";
import { getQ1DataOfCurrentWeek } from "../../controllers/speedTest/week/q1/getQ1DataOfCurrentWeek.controller";
import { getQ1DataOfPreviousWeek } from "../../controllers/speedTest/week/q1/getQ1DataOfPreviousWeek.controller";
import { getQ1DataOfWeek } from "../../controllers/speedTest/week/q1/getQ1DataOfWeek.controller";
import { getQ3DataOfCurrentWeek } from "../../controllers/speedTest/week/q3/getQ3DataOfCurrentWeek.controller";
import { getQ3DataOfPreviousWeek } from "../../controllers/speedTest/week/q3/getQ3DataOfPreviousWeek.controller";
import { getQ3DataOfWeek } from "../../controllers/speedTest/week/q3/getQ3DataOfWeek.controller";
import { getMedianDataOfCurrentWeek } from "../../controllers/speedTest/week/median/getMedianDataOfCurrentWeek.controller";
import { getMedianDataOfPreviousWeek } from "../../controllers/speedTest/week/median/getMedianDataOfPreviousWeek.controller";
import { getMedianDataOfWeek } from "../../controllers/speedTest/week/median/getMedianDataOfWeek.controller";

const speedTestWeekRouter = express.Router();

// GET data of current week
speedTestWeekRouter.get("/current", getDataOfCurrentWeek);
// GET data of previous week
speedTestWeekRouter.get("/previous", getDataOfPreviousWeek);
// GET data for a specific week
speedTestWeekRouter.get("/:weekNumber", getDataOfWeek);
// GET average data of current week
speedTestWeekRouter.get("/current/average", getAverageDataOfCurrentWeek);
// GET average data of previous week
speedTestWeekRouter.get("/previous/average", getAverageDataOfPreviousWeek);
// GET average data for a specific week
speedTestWeekRouter.get("/:weekNumber/average", getAverageDataOfWeek);
// GET max data of current week
speedTestWeekRouter.get("/current/max", getMaxDataOfCurrentWeek);
// GET max data of previous week
speedTestWeekRouter.get("/previous/max", getMaxDataOfPreviousWeek);
// GET max data for a specific week
speedTestWeekRouter.get("/:weekNumber/max", getMaxDataOfWeek);
// GET min data of current week
speedTestWeekRouter.get("/current/min", getMinDataOfCurrentWeek);
// GET min data of previous week
speedTestWeekRouter.get("/previous/min", getMinDataOfPreviousWeek);
// GET min data for a specific week
speedTestWeekRouter.get("/:weekNumber/min", getMinDataOfWeek);
// GET Q1 data of current week
speedTestWeekRouter.get("/current/q1", getQ1DataOfCurrentWeek);
// GET Q1 data of previous week
speedTestWeekRouter.get("/previous/q1", getQ1DataOfPreviousWeek);
// GET Q1 data for a specific week
speedTestWeekRouter.get("/:weekNumber/q1", getQ1DataOfWeek);
// GET Q3 data of current week
speedTestWeekRouter.get("/current/q3", getQ3DataOfCurrentWeek);
// GET Q3 data of previous week
speedTestWeekRouter.get("/previous/q3", getQ3DataOfPreviousWeek);
// GET Q3 data for a specific week
speedTestWeekRouter.get("/:weekNumber/q3", getQ3DataOfWeek);
// GET median data of current week
speedTestWeekRouter.get("/current/median", getMedianDataOfCurrentWeek);
// GET median data of previous week
speedTestWeekRouter.get("/previous/median", getMedianDataOfPreviousWeek);
// GET median data for a specific week
speedTestWeekRouter.get("/:weekNumber/median", getMedianDataOfWeek);

export default speedTestWeekRouter;
