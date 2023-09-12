import { Request, Response } from "express";
import fs from "fs";

const APP_MODE = process.env.APP_MODE;

// Default route
export const defaultRoute = async (req: Request, res: Response) => {
  res.status(200).json({
    msg: "🚀 Welcome speedTest data !",
  });
};

// GET data of a specific date
export const getDataOfSpecificDate = async (req: Request, res: Response) => {
  try {
    const { filename } = req.params;
    const data = APP_MODE?.includes("UNIX")
      ? fs.readFileSync(`./data/${filename}.json`, "utf-8")
      : fs.readFileSync(`../script/data/${filename}.json`, "utf-8");
    res.status(200).json(JSON.parse(data));
  } catch (error: any) {
    res.status(500).json({
      error: `Erreur lors de la récupération des données - ${error.message}`,
    });
  }
};

// GET data of today
export const getDataOfToday = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0].replaceAll("-", ""); // Format AAAAMMJJ
    const data =
      process.env.APP_MODE === "UNIX_DEVELOPMENT"
        ? fs.readFileSync(`./data/${formattedDate}.json`, "utf-8")
        : fs.readFileSync(`../script/data/${formattedDate}.json`, "utf-8");
    res.json(JSON.parse(data));
  } catch (error: any) {
    res.status(500).json({
      error: `Erreur lors de la récupération des données - ${error.message}`,
    });
  }
};

// GET data of yesterday
export const getDataOfYesterday = async (req: Request, res: Response) => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedDate = yesterday
      .toISOString()
      .split("T")[0]
      .replaceAll("-", ""); // Format AAAAMMJJ
    const data =
      process.env.APP_MODE === "UNIX_DEVELOPMENT"
        ? fs.readFileSync(`./data/${formattedDate}.json`, "utf-8")
        : fs.readFileSync(`../script/data/${formattedDate}.json`, "utf-8");
    res.json(JSON.parse(data));
  } catch (error: any) {
    res.status(500).json({
      error: `Erreur lors de la récupération des données - ${error.message}`,
    });
  }
};
