import { Request, Response } from "express";
import fs from "fs";
import { ISpeedTestData } from "../../../data/interface/ISpeedTestData";

const APP_MODE = process.env.APP_MODE;

// GET data of a specific week
export const getDataOfWeek = async (req: Request, res: Response) => {
  try {
    const { weekNumber } = req.params;

    const today = new Date();
    const currentYear = today.getFullYear();

    // Calcul de la date du début de la semaine (lundi)
    const startDate = new Date(
      currentYear,
      0,
      (parseInt(weekNumber) - 1) * 7 + 1
    );
    startDate.setDate(startDate.getDate() + (1 - startDate.getDay()) + 1);

    // Calcul de la date de fin de la semaine (dimanche)
    const endDate = new Date(
      currentYear,
      0,
      (parseInt(weekNumber) - 1) * 7 + 7
    );
    endDate.setDate(endDate.getDate() + (7 - endDate.getDay()) + 1);

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
