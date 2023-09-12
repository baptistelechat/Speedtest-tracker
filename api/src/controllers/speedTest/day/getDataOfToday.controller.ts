import { Request, Response } from "express";
import fs from "fs";
import { ISpeedTestData } from "../../../data/interface/ISpeedTestData";

// GET data of today
export const getDataOfToday = async (req: Request, res: Response) => {
  const APP_MODE = process.env.APP_MODE;

  try {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0].replaceAll("-", ""); // Format AAAAMMJJ
    const fileData = APP_MODE?.includes("UNIX")
      ? fs.readFileSync(`./data/${formattedDate}.json`, "utf-8")
      : fs.readFileSync(`../script/data/${formattedDate}.json`, "utf-8");
    const jsonData: ISpeedTestData[] = JSON.parse(fileData);

    res.json(jsonData);
  } catch (error: any) {
    res.status(500).json({
      error: `Erreur lors de la récupération des données - ${error.message}`,
    });
  }
};
