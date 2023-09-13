import { Request, Response } from "express";
import fs from "fs";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { ISpeedTestData } from "../../../../data/interface/ISpeedTestData";

dayjs.extend(weekOfYear);

// GET Q1 data of current week
export const getQ1DataOfCurrentWeek = (req: Request, res: Response) => {
  const APP_MODE = process.env.APP_MODE;

  try {
    const currentYear = dayjs().year();
    const currentWeek = dayjs().week();

    const startDate = dayjs(`${currentYear}-01-01`, "YYYY-MM-DD")
      .startOf("week")
      .add(currentWeek - 1, "week")
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

    const sortedDownload = data
      .map((entry) => Number(entry.download))
      .sort((a, b) => a - b);
    const q1Index = Math.floor(sortedDownload.length / 4);
    const q1DownloadValue = sortedDownload[q1Index];

    const sortedUpload = data
      .map((entry) => Number(entry.upload))
      .sort((a, b) => a - b);
    const q1UploadValue = sortedUpload[q1Index];

    const sortedPing = data
      .map((entry) => Number(entry.ping))
      .sort((a, b) => a - b);
    const q1PingValue = sortedPing[q1Index];

    const stat: ISpeedTestData = {
      id: `q1_week_${currentWeek}`,
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
