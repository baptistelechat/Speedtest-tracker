import { Request, Response } from "express";
import fs from "fs";
import dayjs from "dayjs";
import { ISpeedTestData } from "../../../../data/interface/ISpeedTestData";

// GET Q3 data of current month
export const getQ3DataOfCurrentMonth = async (req: Request, res: Response) => {
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

    const sortedDownload = data
      .map((entry) => Number(entry.download))
      .sort((a, b) => a - b);
    const q3Index = Math.floor((3 * sortedDownload.length) / 4);
    const q3DownloadValue = sortedDownload[q3Index];

    const sortedUpload = data
      .map((entry) => Number(entry.upload))
      .sort((a, b) => a - b);
    const q3UploadValue = sortedUpload[q3Index];

    const sortedPing = data
      .map((entry) => Number(entry.ping))
      .sort((a, b) => a - b);
    const q3PingValue = sortedPing[q3Index];

    const stat: ISpeedTestData = {
      id: `q3_month_${currentMonth}`,
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
