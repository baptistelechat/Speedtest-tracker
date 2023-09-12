import { ISpeedTestData } from "../data/interface/ISpeedTestData";
import { ISpeedTestResult } from "../data/interface/ISpeedTestResult";
import { convertBytesToMbps } from "./convertBytesToMbps";

export const getSpeedTestData = (
  timestamp: string,
  speedTestResult: ISpeedTestResult
): ISpeedTestData => {
  const ID = speedTestResult.result.id;
  const pingInMs = speedTestResult.ping.latency;
  const downloadMbps = convertBytesToMbps(
    speedTestResult.download.bytes,
    speedTestResult.download.elapsed
  );
  const uploadMbps = convertBytesToMbps(
    speedTestResult.upload.bytes,
    speedTestResult.upload.elapsed
  );

  return {
    timestamp: timestamp,
    id: ID,
    ping: pingInMs.toString(),
    download: downloadMbps.toFixed(2),
    upload: uploadMbps.toFixed(2),
  };
};
