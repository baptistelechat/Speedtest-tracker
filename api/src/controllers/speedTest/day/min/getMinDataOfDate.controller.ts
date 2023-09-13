import { Request, Response } from "express";
import fs from "fs";
import dayjs from "dayjs";
import { ISpeedTestData } from "../../../../data/interface/ISpeedTestData";

// GET min data of a specific date
export const getMinDataOfDate = async (req: Request, res: Response) => {
  const APP_MODE = process.env.APP_MODE;

  try {
    const { filename } = req.params;
    const formattedDate = dayjs(filename, "YYYYMMDD").format("YYYYMMDD");

    const dataPath = APP_MODE?.includes("UNIX")
      ? `./data/${formattedDate}.json`
      : `../script/data/${formattedDate}.json`;

    const fileData = fs.readFileSync(dataPath, "utf-8");
    const jsonData: ISpeedTestData[] = JSON.parse(fileData);

    let minDownload = Infinity;
    let minUpload = Infinity;
    let minPing = Infinity;

    for (const entry of jsonData) {
      minDownload = Math.min(minDownload, Number(entry.download));
      minUpload = Math.min(minUpload, Number(entry.upload));
      minPing = Math.min(minPing, Number(entry.ping));
    }

    const stat: ISpeedTestData = {
      id: `min_${formattedDate}`,
      ping:
        String(minPing.toFixed(2)) !== "Infinity"
          ? String(minPing.toFixed(2))
          : "-",
      download:
        String(minDownload.toFixed(2)) !== "Infinity"
          ? String(minDownload.toFixed(2))
          : "-",
      upload:
        String(minUpload.toFixed(2)) !== "Infinity"
          ? String(minUpload.toFixed(2))
          : "-",
    };

    res.status(200).json(stat);
  } catch (error: any) {
    res.status(500).json({
      error: `Erreur lors de la récupération des données - ${error.message}`,
    });
  }
};
