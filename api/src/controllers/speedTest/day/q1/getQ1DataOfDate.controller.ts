import { Request, Response } from "express";
import fs from "fs";
import dayjs from "dayjs";
import { ISpeedTestData } from "../../../../data/interface/ISpeedTestData";

// GET Q1 data of a specific date
export const getQ1DataOfDate = async (req: Request, res: Response) => {
  const APP_MODE = process.env.APP_MODE;

  try {
    const { filename } = req.params;
    const formattedDate = dayjs(filename, "YYYYMMDD").format("YYYYMMDD");

    const dataPath = APP_MODE?.includes("UNIX")
      ? `./data/${formattedDate}.json`
      : `../script/data/${formattedDate}.json`;

    const fileData = fs.readFileSync(dataPath, "utf-8");
    const jsonData: ISpeedTestData[] = JSON.parse(fileData);

    const q1Index = (jsonData.length + 1) / 4;

    const sortedDownload = jsonData
      .map((entry) => Number(entry.download))
      .sort((a, b) => a - b);
    const q1DownloadValue =
      q1Index % 1 !== 0
        ? (sortedDownload[Math.ceil(q1Index - 1)] +
            sortedDownload[Math.floor(q1Index - 1)]) /
          2
        : sortedDownload[q1Index - 1];

    const sortedUpload = jsonData
      .map((entry) => Number(entry.upload))
      .sort((a, b) => a - b);
    const q1UploadValue =
      q1Index % 1 !== 0
        ? (sortedUpload[Math.ceil(q1Index - 1)] +
            sortedUpload[Math.floor(q1Index - 1)]) /
          2
        : sortedUpload[q1Index - 1];

    const sortedPing = jsonData
      .map((entry) => Number(entry.ping))
      .sort((a, b) => a - b);
    const q1PingValue =
      q1Index % 1 !== 0
        ? (sortedPing[Math.ceil(q1Index - 1)] +
            sortedPing[Math.floor(q1Index - 1)]) /
          2
        : sortedPing[q1Index - 1];

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
