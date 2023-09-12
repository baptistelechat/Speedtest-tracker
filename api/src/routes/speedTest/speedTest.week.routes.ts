import express from "express";
import { getDataOfCurrentWeek } from "../../controllers/speedTest/week/getDataOfCurrentWeek.controller";
import { getDataOfPreviousWeek } from "../../controllers/speedTest/week/getDataOfPreviousWeek.controller";
import { getDataOfWeek } from "../../controllers/speedTest/week/getDataOfWeek.controller";


const speedTestWeekRouter = express.Router();

// GET data of current week
speedTestWeekRouter.get("/current", getDataOfCurrentWeek);
// GET data of previous week
speedTestWeekRouter.get("/previous", getDataOfPreviousWeek);
// GET data for a specific week
speedTestWeekRouter.get("/:weekNumber", getDataOfWeek);

export default speedTestWeekRouter;
