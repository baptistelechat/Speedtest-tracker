import { Request, Response } from "express";
import fs from "fs";
import dayjs from "dayjs";
import { ISpeedTestData } from "../../../../data/interface/ISpeedTestData";

// GET median data of a specific date
export const getMedianDataOfDate = async (req: Request, res: Response) => {
  const APP_MODE = process.env.APP_MODE;

  try {
    const { filename } = req.params;
    const formattedDate = dayjs(filename, "YYYYMMDD").format("YYYYMMDD");

    const dataPath = APP_MODE?.includes("UNIX")
      ? `./data/${formattedDate}.json`
      : `../script/data/${formattedDate}.json`;

    const fileData = fs.readFileSync(dataPath, "utf-8");
    const jsonData: ISpeedTestData[] = JSON.parse(fileData);

    const medianIndex = (jsonData.length + 1) / 2;

    const sortedDownload = jsonData
      .map((entry) => Number(entry.download))
      .sort((a, b) => a - b);
    const medianDownloadValue =
      medianIndex % 1 !== 0
        ? (sortedDownload[Math.ceil(medianIndex - 1)] +
            sortedDownload[Math.floor(medianIndex - 1)]) /
          2
        : sortedDownload[medianIndex - 1];

    const sortedUpload = jsonData
      .map((entry) => Number(entry.upload))
      .sort((a, b) => a - b);
    const medianUploadValue =
      medianIndex % 1 !== 0
        ? (sortedUpload[Math.ceil(medianIndex - 1)] +
            sortedUpload[Math.floor(medianIndex - 1)]) /
          2
        : sortedUpload[medianIndex - 1];

    const sortedPing = jsonData
      .map((entry) => Number(entry.ping))
      .sort((a, b) => a - b);
    const medianPingValue =
      medianIndex % 1 !== 0
        ? (sortedPing[Math.ceil(medianIndex - 1)] +
            sortedPing[Math.floor(medianIndex - 1)]) /
          2
        : sortedPing[medianIndex - 1];

    const stat: ISpeedTestData = {
      id: `median_${formattedDate}`,
      ping: medianPingValue ? String(medianPingValue.toFixed(2)) : "-",
      download: medianDownloadValue ? String(medianDownloadValue.toFixed(2)) : "-",
      upload: medianUploadValue ? String(medianUploadValue.toFixed(2)) : "-",
    };

    res.status(200).json(stat);
  } catch (error: any) {
    res.status(500).json({
      error: `Erreur lors de la récupération des données - ${error.message}`,
    });
  }
};
