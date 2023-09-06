import { ISpeedTestResult } from "../interface/ISpeedTestResult";
import { convertBytesToMbps } from "./convertBytesToMbps";

export const speedTestResultLogger = (speedTestResult: ISpeedTestResult) => {
  // Extraire les données de ping, de téléchargement et de téléchargement à partir des résultats
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

  console.log(`📘 ID : ${ID}`);
  console.log(`⏳ Ping : ${pingInMs} ms`);
  console.log(`🔽 Download : ${downloadMbps.toFixed(2)} Mbps`);
  console.log(`🔼 Upload : ${uploadMbps.toFixed(2)} Mbps`);
};
