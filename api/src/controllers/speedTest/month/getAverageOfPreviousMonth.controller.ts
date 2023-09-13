import { Request, Response } from "express";
import fs from "fs";
import dayjs from "dayjs";
import { ISpeedTestData } from "../../../data/interface/ISpeedTestData";

// GET average data of previous month
export const getAverageOfPreviousMonth = async (
  req: Request,
  res: Response
) => {
  const APP_MODE = process.env.APP_MODE;

  try {
    const currentYear = dayjs().year();
    const currentMonth = dayjs().month() + 1;

    const startDate = dayjs(
      `${currentYear}-${currentMonth}-01`,
      "YYYY-MM-DD"
    ).subtract(1, "month");
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
      id: `average_month_${currentMonth - 1}`,
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
