import { Request, Response } from "express";
import fs from "fs";
import { ISpeedTestData } from "../data/interface/ISpeedTestData";

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
    const fileData = process.env.APP_MODE?.includes("UNIX")
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

// GET last data of today
export const getLastDataOfToday = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0].replaceAll("-", ""); // Format AAAAMMJJ
    const dataPath = process.env.APP_MODE?.includes("UNIX")
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

// GET data of yesterday
export const getDataOfYesterday = async (req: Request, res: Response) => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedDate = yesterday
      .toISOString()
      .split("T")[0]
      .replaceAll("-", ""); // Format AAAAMMJJ
    const fileData = process.env.APP_MODE?.includes("UNIX")
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