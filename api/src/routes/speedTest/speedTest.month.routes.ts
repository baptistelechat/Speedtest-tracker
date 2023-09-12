import express from "express";
import { getDataOfCurrentMonth } from "../../controllers/speedTest/month/getDataOfCurrentMonth.controller";
import { getDataOfMonth } from "../../controllers/speedTest/month/getDataOfMonth.controller";
import { getDataOfPreviousMonth } from "../../controllers/speedTest/month/getDataOfPreviousMonth.controller";


const speedTestMonthRouter = express.Router();

// GET data for current month
speedTestMonthRouter.get("/current", getDataOfCurrentMonth);
// GET data for previous month
speedTestMonthRouter.get("/previous", getDataOfPreviousMonth);
// GET data for a specific month
speedTestMonthRouter.get("/:monthNumber", getDataOfMonth);

export default speedTestMonthRouter;
