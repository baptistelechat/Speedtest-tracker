import { Request, Response } from "express";
import fs from "fs";
import dayjs from "dayjs";
import { ISpeedTestData } from "../../../../data/interface/ISpeedTestData";

// GET last data of today
export const getLastDataOfToday = async (req: Request, res: Response) => {
  const APP_MODE = process.env.APP_MODE;

  try {
    const today = dayjs();
    const formattedDate = today.format("YYYYMMDD");

    const dataPath = APP_MODE?.includes("UNIX")
      ? `./data/${formattedDate}.json`
      : `../script/data/${formattedDate}.json`;

    const fileData = fs.readFileSync(dataPath, "utf-8");
    const jsonData: ISpeedTestData[] = JSON.parse(fileData);
    const lastEntry = jsonData[jsonData.length - 1];

    res.status(200).json(lastEntry);
  } catch (error: any) {
    res.status(500).json({
      error: `Erreur lors de la récupération des données - ${error.message}`,
    });
  }
};
