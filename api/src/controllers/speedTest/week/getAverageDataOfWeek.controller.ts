import { Request, Response } from "express";
import fs from "fs";
import dayjs from "dayjs";
import { ISpeedTestData } from "../../../data/interface/ISpeedTestData";

// GET average data of current week
export const getAverageDataOfWeek = (req: Request, res: Response) => {
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

    const totalDownload = data.reduce(
      (acc: number, entry: any) => acc + Number(entry.download),
      0
    );
    const totalUpload = data.reduce(
      (acc: number, entry: any) => acc + Number(entry.upload),
      0
    );
    const totalPing = data.reduce(
      (acc: number, entry: any) => acc + Number(entry.ping),
      0
    );

    const averageDownload = totalDownload / data.length;
    const averageUpload = totalUpload / data.length;
    const averagePing = totalPing / data.length;

    const stat: ISpeedTestData = {
      id: `average_week_${weekNumber}`,
      ping: String(averagePing.toFixed(2)),
      download: String(averageDownload.toFixed(2)),
      upload: String(averageUpload.toFixed(2)),
    };

    res.status(200).json(stat);
  } catch (error: any) {
    res.status(500).json({
      error: `Erreur lors de la récupération des données - ${error.message}`,
    });
  }
};
