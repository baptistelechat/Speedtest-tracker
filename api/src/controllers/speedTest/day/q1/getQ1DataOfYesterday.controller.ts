import { Request, Response } from "express";
import fs from "fs";
import dayjs from "dayjs";
import { ISpeedTestData } from "../../../../data/interface/ISpeedTestData";

// GET Q1 data of yesterday
export const getQ1DataOfYesterday = async (req: Request, res: Response) => {
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
    const q1Index = Math.floor(sortedDownload.length / 4);
    const q1DownloadValue = sortedDownload[q1Index];

    const sortedUpload = jsonData
      .map((entry) => Number(entry.upload))
      .sort((a, b) => a - b);
    const q1UploadValue = sortedUpload[q1Index];

    const sortedPing = jsonData
      .map((entry) => Number(entry.ping))
      .sort((a, b) => a - b);
    const q1PingValue = sortedPing[q1Index];

    const stat: ISpeedTestData = {
      id: `q1_${formattedDate}`,
      ping: q1PingValue ? String(q1PingValue.toFixed(2)) : "-",
      download: q1DownloadValue ? String(q1DownloadValue.toFixed(2)) : "-",
      upload: q1UploadValue ? String(q1UploadValue.toFixed(2)) : "-",
    };

    res.status(200).json(stat);
  } catch (error: any) {
    res.status(500).json({
      error: `Erreur lors de la récupération des données - ${error.message}`,
    });
  }
};
