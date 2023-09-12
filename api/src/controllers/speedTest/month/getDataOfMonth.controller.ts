import { Request, Response } from "express";
import fs from "fs";
import { ISpeedTestData } from "../../../data/interface/ISpeedTestData";

// GET data of a specific month
export const getDataOfMonth = async (req: Request, res: Response) => {
  const APP_MODE = process.env.APP_MODE;

  try {
    const { monthNumber } = req.params;

    const today = new Date();
    const currentYear = today.getFullYear();

    // Calcul de la date du début du mois
    const startDate = new Date(currentYear, parseInt(monthNumber) - 1, 1);

    // Calcul de la date de fin du mois
    const endDate = new Date(currentYear, parseInt(monthNumber), 0);

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
