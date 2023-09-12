import { Request, Response } from "express";
import fs from "fs";
import { ISpeedTestData } from "../../../data/interface/ISpeedTestData";

const APP_MODE = process.env.APP_MODE;

// GET data of a specific date
export const getDataOfSpecificDate = async (req: Request, res: Response) => {
  try {
    const { filename } = req.params;
    const fileData = APP_MODE?.includes("UNIX")
      ? fs.readFileSync(`./data/${filename}.json`, "utf-8")
      : fs.readFileSync(`../script/data/${filename}.json`, "utf-8");

    const jsonData: ISpeedTestData[] = JSON.parse(fileData);

    res.status(200).json(jsonData);
  } catch (error: any) {
    res.status(500).json({
      error: `Erreur lors de la récupération des données - ${error.message}`,
    });
  }
};
