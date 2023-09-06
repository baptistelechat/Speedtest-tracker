import { execSync } from "child_process";
import cron from "node-cron";
import fs from "fs/promises";
import dotenv from "dotenv";
import { getCurrentTimestamp } from "./utils/getCurrentTimestamp.js";

dotenv.config();

const launchSpeedTest = async () => {
  const timestamp = getCurrentTimestamp();

  let speedtestCommand = "speedtest --accept-license --accept-gdpr -f json";
  if (process.env.APP_MODE.includes("WIN")) {
    speedtestCommand = `${process.env.WINDOWS_SPEEDTEST_CLI_PATH} -f json`;
  }

  console.log(`🚩 Start speedtest-cli... (${timestamp})`);

  try {
    const speedtestOutput = execSync(speedtestCommand, {
      encoding: "utf-8",
    });

    const speedtestResult = JSON.parse(speedtestOutput);

    // Extraire les données de ping, de téléchargement et de téléchargement à partir des résultats
    // ID
    const ID = speedtestResult.result.id;
    console.log(`📘 ID : ${ID}`);
    // Ping
    const pingInMs = speedtestResult.ping.latency;
    console.log(`⏳ Ping : ${pingInMs} ms`);
    // Download / Upload
    const downloadMbps =
      speedtestResult.download.bytes /
      125000 /
      (speedtestResult.download.elapsed / 1000);
    const uploadMbps =
      speedtestResult.upload.bytes /
      125000 /
      (speedtestResult.upload.elapsed / 1000);
    console.log(`🔽 Download : ${downloadMbps.toFixed(2)} Mbps`);
    console.log(`🔼 Upload : ${uploadMbps.toFixed(2)} Mbps`);

    console.log("🏁 Speed test finish");

    // Crée un objet pour stocker les résultats
    const testResult = {
      timestamp: timestamp,
      id: ID,
      ping: pingInMs.toString(),
      download: downloadMbps.toFixed(2),
      upload: uploadMbps.toFixed(2),
    };

    // Charge les données existantes depuis le fichier JSON
    let jsonData = [];
    try {
      const fileData = await fs.readFile("results.json", "utf8");
      jsonData = JSON.parse(fileData);
    } catch (error) {
      // Le fichier n'existe probablement pas, alors on le crée
      await fs.writeFile("results.json", JSON.stringify([], null, 2));
    }

    // Ajoute les nouvelles données au tableau
    jsonData.push(testResult);

    // Écrit les données dans le fichier JSON
    console.log("📝 Write data");
    await fs.writeFile("results.json", JSON.stringify(jsonData, null, 2));
    console.log("");
  } catch (err) {
    console.error("Erreur lors du test de vitesse :", err.message);
    process.exit(1); // Quitte le script avec un code d'erreur
  }
};

// Planifie l'exécution du script
(async () => {
  console.log(`🌍 ${process.env.APP_MODE}`);
  console.log("");

  // Exécute la fonction initiale
  await launchSpeedTest();

  // Définis la fréquence de la tâche en fonction de l'environnement
  if (process.env.APP_MODE.includes("PRODUCTION")) {
    // Utilise cron pour planifier l'exécution récurrente
    cron.schedule("*/15 * * * *", async () => {
      await launchSpeedTest();
    });
  }
  if (process.env.APP_MODE.includes("DEVELOPMENT")) {
    // Utilise cron pour planifier l'exécution récurrente
    cron.schedule("* * * * *", async () => {
      await launchSpeedTest();
    });
  }
})();
