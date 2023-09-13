import { Request, Response } from "express";
import fs from "fs";
import dayjs from "dayjs";
import { ISpeedTestData } from "../../../../data/interface/ISpeedTestData";

// GET Q3 data of yesterday
export const getQ3DataOfYesterday = async (req: Request, res: Response) => {
  const APP_MODE = process.env.APP_MODE;

  try {
    const yesterday = dayjs().subtract(1, "day");
    const formattedDate = yesterday.format("YYYYMMDD");

    const dataPath = APP_MODE?.includes("UNIX")
      ? `./data/${formattedDate}.json`
      : `../script/data/${formattedDate}.json`;

    const fileData = fs.readFileSync(dataPath, "utf-8");
    const jsonData: ISpeedTestData[] = JSON.parse(fileData);

    const sortedDownload = jsonData
      .map((entry) => Number(entry.download))
      .sort((a, b) => a - b);
    const q3Index = Math.floor((3 * sortedDownload.length) / 4);
    const q3DownloadValue = sortedDownload[q3Index];

    const sortedUpload = jsonData
      .map((entry) => Number(entry.upload))
      .sort((a, b) => a - b);
    const q3UploadValue = sortedUpload[q3Index];

    const sortedPing = jsonData
      .map((entry) => Number(entry.ping))
      .sort((a, b) => a - b);
    const q3PingValue = sortedPing[q3Index];

    const stat: ISpeedTestData = {
      id: `q3_${formattedDate}`,
      ping: q3PingValue ? String(q3PingValue.toFixed(2)) : "-",
      download: q3DownloadValue ? String(q3DownloadValue.toFixed(2)) : "-",
      upload: q3UploadValue ? String(q3UploadValue.toFixed(2)) : "-",
    };

    res.status(200).json(stat);
  } catch (error: any) {
    res.status(500).json({
      error: `Erreur lors de la récupération des données - ${error.message}`,
    });
  }
};
