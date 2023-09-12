import { Request, Response } from "express";
import fs from "fs";
import { ISpeedTestData } from "../../../data/interface/ISpeedTestData";

// GET last data of today
export const getLastDataOfToday = async (req: Request, res: Response) => {
  const APP_MODE = process.env.APP_MODE;
  
  try {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0].replaceAll("-", ""); // Format AAAAMMJJ
    const dataPath = APP_MODE?.includes("UNIX")
      ? `./data/${formattedDate}.json`
      : `../script/data/${formattedDate}.json`;

    // Lecture du fichier de données
    const fileData = fs.readFileSync(dataPath, "utf-8");
    const jsonData: ISpeedTestData[] = JSON.parse(fileData);

    // Obtention du dernier objet
    const lastData = jsonData.length > 0 ? jsonData[jsonData.length - 1] : null;

    res.json(lastData);
  } catch (error: any) {
    res.status(500).json({
      error: `Erreur lors de la récupération des données - ${error.message}`,
    });
  }
};
