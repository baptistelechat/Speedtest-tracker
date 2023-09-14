import { Request, Response } from "express";
import fs from "fs";
import dayjs from "dayjs";
import { ISpeedTestData } from "../../../../data/interface/ISpeedTestData";

// GET median data of a specific month
export const getMedianDataOfMonth = async (req: Request, res: Response) => {
  const APP_MODE = process.env.APP_MODE;

  try {
    const { monthNumber } = req.params;
    const currentYear = dayjs().year(); // Année en cours

    const startDate = dayjs(`${currentYear}-${monthNumber}-01`, "YYYY-MM-DD");
    const endDate = startDate.endOf("month");

    const data = [];

    for (
      let date = startDate;
      date.isBefore(endDate);
      date = date.add(1, "day")
    ) {
      const formattedDate = date.format("YYYYMMDD");
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

    const medianIndex = (data.length + 1) / 2;

    const sortedDownload = data
      .map((entry) => Number(entry.download))
      .sort((a, b) => a - b);
    const medianDownloadValue =
      medianIndex % 1 !== 0
        ? (sortedDownload[Math.ceil(medianIndex - 1)] +
            sortedDownload[Math.floor(medianIndex - 1)]) /
          2
        : sortedDownload[medianIndex - 1];

    const sortedUpload = data
      .map((entry) => Number(entry.upload))
      .sort((a, b) => a - b);
    const medianUploadValue =
      medianIndex % 1 !== 0
        ? (sortedUpload[Math.ceil(medianIndex - 1)] +
            sortedUpload[Math.floor(medianIndex - 1)]) /
          2
        : sortedUpload[medianIndex - 1];

    const sortedPing = data
      .map((entry) => Number(entry.ping))
      .sort((a, b) => a - b);
    const medianPingValue =
      medianIndex % 1 !== 0
        ? (sortedPing[Math.ceil(medianIndex - 1)] +
            sortedPing[Math.floor(medianIndex - 1)]) /
          2
        : sortedPing[medianIndex - 1];

    const stat: ISpeedTestData = {
      id: `median_month_${monthNumber}`,
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
