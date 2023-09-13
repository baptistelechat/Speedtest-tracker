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

export default speedTestWeekRouter;
