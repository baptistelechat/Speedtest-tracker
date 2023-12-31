import { Request, Response } from "express";
import fs from "fs";
import dayjs from "dayjs";
import { ISpeedTestData } from "../../../../data/interface/ISpeedTestData";

// GET Q1 data of current month
export const getQ1DataOfCurrentMonth = async (req: Request, res: Response) => {
  const APP_MODE = process.env.APP_MODE;

  try {
    const currentYear = dayjs().year(); // Année en cours
    const currentMonth = dayjs().month() + 1; // Mois en cours (de 0 à 11)

    const startDate = dayjs(`${currentYear}-${currentMonth}-01`, "YYYY-MM-DD");
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

    const q1Index = (data.length + 1) / 4;

    const sortedDownload = data
      .map((entry) => Number(entry.download))
      .sort((a, b) => a - b);
    const q1DownloadValue =
      q1Index % 1 !== 0
        ? (sortedDownload[Math.ceil(q1Index - 1)] +
            sortedDownload[Math.floor(q1Index - 1)]) /
          2
        : sortedDownload[q1Index - 1];

    const sortedUpload = data
      .map((entry) => Number(entry.upload))
      .sort((a, b) => a - b);
    const q1UploadValue =
      q1Index % 1 !== 0
        ? (sortedUpload[Math.ceil(q1Index - 1)] +
            sortedUpload[Math.floor(q1Index - 1)]) /
          2
        : sortedUpload[q1Index - 1];

    const sortedPing = data
      .map((entry) => Number(entry.ping))
      .sort((a, b) => a - b);
    const q1PingValue =
      q1Index % 1 !== 0
        ? (sortedPing[Math.ceil(q1Index - 1)] +
            sortedPing[Math.floor(q1Index - 1)]) /
          2
        : sortedPing[q1Index - 1];

    const stat: ISpeedTestData = {
      id: `q1_month_${currentMonth}`,
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
