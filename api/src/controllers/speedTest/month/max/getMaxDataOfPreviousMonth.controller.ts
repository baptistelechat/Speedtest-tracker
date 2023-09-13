import { Request, Response } from "express";
import fs from "fs";
import dayjs from "dayjs";
import { ISpeedTestData } from "../../../../data/interface/ISpeedTestData";

// GET max data of previous month
export const getMaxDataOfPreviousMonth = async (
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

    let maxDownload = -Infinity;
    let maxUpload = -Infinity;
    let maxPing = -Infinity;

    for (const entry of data) {
      maxDownload = Math.max(maxDownload, Number(entry.download));
      maxUpload = Math.max(maxUpload, Number(entry.upload));
      maxPing = Math.max(maxPing, Number(entry.ping));
    }

    const stat: ISpeedTestData = {
      id: `max_month_${currentMonth - 1}`,
      ping:
        String(maxPing.toFixed(2)) !== "-Infinity"
          ? String(maxPing.toFixed(2))
          : "-",
      download:
        String(maxDownload.toFixed(2)) !== "-Infinity"
          ? String(maxDownload.toFixed(2))
          : "-",
      upload:
        String(maxUpload.toFixed(2)) !== "-Infinity"
          ? String(maxUpload.toFixed(2))
          : "-",
    };

    res.status(200).json(stat);
  } catch (error: any) {
    res.status(500).json({
      error: `Erreur lors de la récupération des données - ${error.message}`,
    });
  }
};
