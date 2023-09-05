import speedTest from "@phanmn/speedtest-net";
import cron from "node-cron";
import fs from "fs/promises";
import dotenv from "dotenv";
import { getCurrentTimestamp } from "./utils/getCurrentTimestamp.js";

dotenv.config();

const launchSpeedTest = async () => {
  const timestamp = getCurrentTimestamp();

  console.log("🚩 Start speedtest.net...");
  try {
    const result = await speedTest({
      acceptLicense: true,
      acceptGdpr: true,
    });

    // Ping
    const pingInMs = result.ping.latency;
    console.log(`⏳ Ping : ${pingInMs} ms`);
    // Download / Upload
    const downloadMbps =
      result.download.bytes / 125000 / (result.download.elapsed / 1000);
    const uploadMbps =
      result.upload.bytes / 125000 / (result.upload.elapsed / 1000);
    console.log(`🔽 Download : ${downloadMbps.toFixed(2)} Mbps`);
    console.log(`🔼 Upload : ${uploadMbps.toFixed(2)} Mbps`);

    console.log("🏁 Speed test finish");

    // Créer un objet pour stocker les résultats
    const testResult = {
      timestamp: timestamp,
      id: result.result.id,
      ping: pingInMs.toString(),
      download: downloadMbps.toFixed(2),
      upload: uploadMbps.toFixed(2),
    };

    // Charger les données existantes depuis le fichier JSON
    let jsonData = [];
    try {
      const fileData = await fs.readFile("results.json", "utf8");
      jsonData = JSON.parse(fileData);
    } catch (error) {
      // Le fichier n'existe probablement pas alors on le crée
      await fs.writeFile("results.json", JSON.stringify([], null, 2));
    }

    // Ajouter les nouvelles données au tableau
    jsonData.push(testResult);

    // Écrire les données dans le fichier JSON
    console.log("📝 Write data");
    await fs.writeFile("results.json", JSON.stringify(jsonData, null, 2));
    console.log("");
  } catch (err) {
    console.log(err.message);
    process.exit(0);
  }
};

// Planifier l'exécution du script
(async () => {
  // Exécute la fonction initiale
  launchSpeedTest();

  console.log(`// 🌍 ${process.env.APP_MODE}`);

  // Définis la fréquence de la tâche en fonction de l'environnement
  if (process.env.APP_MODE === "PRODUCTION") {
    // Utilise cron pour planifier l'exécution récurrente
    cron.schedule("*/15 * * * *", async () => {
      await launchSpeedTest();
    });
  }
  if (process.env.APP_MODE === "DEVELOPMENT") {
    // Utilise cron pour planifier l'exécution récurrente
    cron.schedule("* * * * *", async () => {
      await launchSpeedTest();
    });
  }
})();
