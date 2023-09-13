import { Request, Response } from "express";
import fs from "fs";
import dayjs from "dayjs";
import { ISpeedTestData } from "../../../../data/interface/ISpeedTestData";

// GET max data of a specific date
export const getMaxDataOfDate = async (req: Request, res: Response) => {
  const APP_MODE = process.env.APP_MODE;

  try {
    const { filename } = req.params;
    const formattedDate = dayjs(filename, "YYYYMMDD").format("YYYYMMDD");

    const dataPath = APP_MODE?.includes("UNIX")
      ? `./data/${formattedDate}.json`
      : `../script/data/${formattedDate}.json`;

    const fileData = fs.readFileSync(dataPath, "utf-8");
    const jsonData: ISpeedTestData[] = JSON.parse(fileData);

    let maxDownload = -Infinity;
    let maxUpload = -Infinity;
    let maxPing = -Infinity;

    for (const entry of jsonData) {
      maxDownload = Math.max(maxDownload, Number(entry.download));
      maxUpload = Math.max(maxUpload, Number(entry.upload));
      maxPing = Math.max(maxPing, Number(entry.ping));
    }

    const stat: ISpeedTestData = {
      id: `max_${formattedDate}`,
      ping:
        String(maxPing.toFixed(2)) !== "-Infinity"
          ? String(maxPing.toFixed(2))
          : "-",
      download:
        String(maxDownload.toFixed(2)) !== "-Infinity"
          ? String(maxDownload.toFixed(2))
          : "-",
      upload:
        String(maxUpload.toFixed(2)) !== "-Infinity"
          ? String(maxUpload.toFixed(2))
          : "-",
    };

    res.status(200).json(stat);
  } catch (error: any) {
    res.status(500).json({
      error: `Erreur lors de la récupération des données - ${error.message}`,
    });
  }
};
