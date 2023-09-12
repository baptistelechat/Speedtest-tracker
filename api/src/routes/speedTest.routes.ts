import express from "express";
import {
  defaultRoute,
  getDataOfSpecificDate,
  getDataOfToday,
  getDataOfYesterday,
  getLastDataOfToday,
} from "../controllers/speedTest.controllers";

const speedTestRouter = express.Router();

// Default route
speedTestRouter.get("/", defaultRoute);
// GET data of today
speedTestRouter.get("/today", getDataOfToday);
// GET last data of today
speedTestRouter.get("/last", getLastDataOfToday);
// GET all // GET data of yesterday
speedTestRouter.get("/yesterday", getDataOfYesterday);
// GET data of a specific date
speedTestRouter.get("/:filename", getDataOfSpecificDate);

export default speedTestRouter;
