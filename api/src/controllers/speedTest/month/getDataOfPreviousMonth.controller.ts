import { Request, Response } from "express";
import fs from "fs";
import { ISpeedTestData } from "../../../data/interface/ISpeedTestData";

const APP_MODE = process.env.APP_MODE;

// GET data of previous month
export const getDataOfPreviousMonth = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const monthNumber = today.getMonth();

    const currentYear = today.getFullYear();

    // Calcul de la date du début du mois
    const startDate = new Date(currentYear, monthNumber - 1, 2);

    // Calcul de la date de fin du mois
    const endDate = new Date(currentYear, monthNumber, 1);

    const data = [];

    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const formattedDate = date
        .toISOString()
        .split("T")[0]
        .replaceAll("-", "");
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
