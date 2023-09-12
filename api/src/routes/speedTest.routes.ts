import express from "express";
import {
  defaultRoute,
  getDataOfSpecificDate,
  getDataOfToday,
  getDataOfYesterday,
} from "../controllers/speedTest.controllers";

const speedTestRouter = express.Router();

// Default route
speedTestRouter.get("/", defaultRoute);
// GET data of today
speedTestRouter.get("/today", getDataOfToday);
// GET all // GET data of yesterday
speedTestRouter.get("/yesterday", getDataOfYesterday);
// // GET all demandeAbandonnee
speedTestRouter.get("/:filename", getDataOfSpecificDate);

export default speedTestRouter;
