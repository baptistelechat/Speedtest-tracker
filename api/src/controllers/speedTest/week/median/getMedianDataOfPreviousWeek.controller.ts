import { Request, Response } from "express";
import fs from "fs";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { ISpeedTestData } from "../../../../data/interface/ISpeedTestData";

dayjs.extend(weekOfYear);

// GET median data of previous week
export const getMedianDataOfPreviousWeek = (req: Request, res: Response) => {
  const APP_MODE = process.env.APP_MODE;

  try {
    const currentYear = dayjs().year();
    const currentWeek = dayjs().week();

    const startDate = dayjs(`${currentYear}-01-01`, "YYYY-MM-DD")
      .startOf("week")
      .add(currentWeek - 2, "week")
      .add(1, "day");
    const endDate = startDate.endOf("week").add(1, "day");

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
      id: `median_week_${currentWeek - 1}`,
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
