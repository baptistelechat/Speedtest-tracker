import { Request, Response } from "express";
import fs from "fs";
import dayjs from "dayjs";
import { ISpeedTestData } from "../../../data/interface/ISpeedTestData";

// GET average data of yesterday
export const getAverageOfYesterday = async (req: Request, res: Response) => {
  const APP_MODE = process.env.APP_MODE;

  try {
    const yesterday = dayjs().subtract(1, "day");
    const formattedDate = yesterday.format("YYYYMMDD");

    const dataPath = APP_MODE?.includes("UNIX")
      ? `./data/${formattedDate}.json`
      : `../script/data/${formattedDate}.json`;

    const fileData = fs.readFileSync(dataPath, "utf-8");
    const jsonData: ISpeedTestData[] = JSON.parse(fileData);

    const totalDownload = jsonData.reduce(
      (acc: number, entry: any) => acc + Number(entry.download),
      0
    );
    const totalUpload = jsonData.reduce(
      (acc: number, entry: any) => acc + Number(entry.upload),
      0
    );
    const totalPing = jsonData.reduce(
      (acc: number, entry: any) => acc + Number(entry.ping),
      0
    );

    const averageDownload = totalDownload / jsonData.length;
    const averageUpload = totalUpload / jsonData.length;
    const averagePing = totalPing / jsonData.length;

    const stat: ISpeedTestData = {
      id: `average_${formattedDate}`,
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
