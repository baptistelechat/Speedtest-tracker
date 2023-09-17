import { Request, Response } from "express";
import fs from "fs";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { ISpeedTestData } from "../../../../data/interface/ISpeedTestData";

dayjs.extend(isoWeek);

// GET min data of previous week
export const getMinDataOfPreviousWeek = (req: Request, res: Response) => {
  const APP_MODE = process.env.APP_MODE;

  try {
    const currentYear = dayjs().year();
    const currentWeek = dayjs().isoWeek();

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

    let minDownload = Infinity;
    let minUpload = Infinity;
    let minPing = Infinity;

    for (const entry of data) {
      minDownload = Math.min(minDownload, Number(entry.download));
      minUpload = Math.min(minUpload, Number(entry.upload));
      minPing = Math.min(minPing, Number(entry.ping));
    }

    const stat: ISpeedTestData = {
      id: `min_week_${currentWeek - 1}`,
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
