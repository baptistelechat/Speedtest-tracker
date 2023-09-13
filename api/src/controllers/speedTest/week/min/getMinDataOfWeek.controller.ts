import { Request, Response } from "express";
import fs from "fs";
import dayjs from "dayjs";
import { ISpeedTestData } from "../../../../data/interface/ISpeedTestData";

// GET min data of a specific week
export const getMinDataOfWeek = async (req: Request, res: Response) => {
  const APP_MODE = process.env.APP_MODE;

  try {
    const { weekNumber } = req.params;
    const currentYear = dayjs().year();

    const startDate = dayjs(`${currentYear}-01-01`, "YYYY-MM-DD")
      .startOf("week")
      .add(parseInt(weekNumber) - 1, "week")
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

    let minDownload = Infinity;
    let minUpload = Infinity;
    let minPing = Infinity;

    for (const entry of data) {
      minDownload = Math.min(minDownload, Number(entry.download));
      minUpload = Math.min(minUpload, Number(entry.upload));
      minPing = Math.min(minPing, Number(entry.ping));
    }

    const stat: ISpeedTestData = {
      id: `min_week_${weekNumber}`,
      ping:
        String(minPing.toFixed(2)) !== "Infinity"
          ? String(minPing.toFixed(2))
          : "-",
      download:
        String(minDownload.toFixed(2)) !== "Infinity"
          ? String(minDownload.toFixed(2))
          : "-",
      upload:
        String(minUpload.toFixed(2)) !== "Infinity"
          ? String(minUpload.toFixed(2))
          : "-",
    };

    res.status(200).json(stat);
  } catch (error: any) {
    res.status(500).json({
      error: `Erreur lors de la récupération des données - ${error.message}`,
    });
  }
};
