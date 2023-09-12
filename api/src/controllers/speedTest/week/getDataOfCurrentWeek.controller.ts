import { Request, Response } from "express";
import fs from "fs";
import { ISpeedTestData } from "../../../data/interface/ISpeedTestData";
import { getWeekNumber } from "../../../data/utils/getWeekNumber";

const APP_MODE = process.env.APP_MODE;

// GET data of current week
export const getDataOfCurrentWeek = (req: Request, res: Response) => {
  try {
    const today = new Date();
    const weekNumber = getWeekNumber(today);

    const currentYear = today.getFullYear();

    // Calcul de la date du début de la semaine (lundi)
    const startDate = new Date(currentYear, 0, 1); // Commence le 1er janvier de l'année en cours
    startDate.setDate(
      startDate.getDate() + ((weekNumber - 1) * 7 + 1 - startDate.getDay()) + 1
    );

    // Calcul de la date de fin de la semaine (dimanche)
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);

    const data = [];

    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const formattedDate = date
        .toISOString()
        .split("T")[0]
        .replaceAll("-", ""); // Format AAAAMMJJ
      const dataPath = APP_MODE?.includes("UNIX")
        ? `./data/${formattedDate}.json`
        : `../script/data/${formattedDate}.json`;

      try {
        const fileData = fs.readFileSync(dataPath, "utf-8");
        const jsonData: ISpeedTestData[] = JSON.parse(fileData);
        data.push(...jsonData);
      } catch (error) {
        continue;
      }
    }

    res.json(data);
  } catch (error: any) {
    res.status(500).json({
      error: `Erreur lors de la récupération des données - ${error.message}`,
    });
  }
};
