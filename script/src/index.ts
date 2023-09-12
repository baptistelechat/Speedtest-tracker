import { execSync } from "child_process";
import cron from "node-cron";
import fs from "fs/promises";
import dotenv from "dotenv";
import { getCurrentTimestamp } from "./data/utils/getCurrentTimestamp";
import { ISpeedTestData } from "./data/interface/ISpeedTestData";
import { getSpeedTestData } from "./data/utils/getSpeedTestData";
import { ISpeedTestResult } from "./data/interface/ISpeedTestResult";
import { speedTestResultLogger } from "./data/utils/speedTestResultLogger";
import { ensureDataDirectoryExists } from "./data/utils/ensureDataDirectoryExists";

dotenv.config({ path: "../.env" });

const APP_MODE = process.env.APP_MODE as string;
const WINDOWS_SPEEDTEST_CLI_PATH = process.env.WINDOWS_SPEEDTEST_CLI_PATH;

const launchSpeedTest = async () => {
  const timestamp = getCurrentTimestamp();

  // S'assurer que le répertoire data existe
  await ensureDataDirectoryExists();

  let speedTestCommand = "speedtest --accept-license --accept-gdpr -f json";
  if (APP_MODE.includes("WIN")) {
    speedTestCommand = `${WINDOWS_SPEEDTEST_CLI_PATH} -f json`;
  }

  console.log(`🚩 Start speedtest-cli... (${timestamp})`);

  try {
    const speedTestOutput = execSync(speedTestCommand, {
      encoding: "utf-8",
    });

    const speedTestResult: ISpeedTestResult = JSON.parse(speedTestOutput);

    speedTestResultLogger(speedTestResult);

    console.log("🏁 Speed test finish");

    // Crée un objet pour stocker les résultats
    const speedTestData: ISpeedTestData = getSpeedTestData(
      timestamp,
      speedTestResult
    );

    // Génère le chemin complet vers le fichier de données
    const filename = getCurrentTimestamp(true, true);
    const dataFilePath = `./data/${filename}.json`;

    // Charge les données existantes depuis le fichier JSON
    let jsonData: ISpeedTestData[] = [];
    try {
      const fileData = await fs.readFile(dataFilePath, "utf8");
      jsonData = JSON.parse(fileData);
    } catch (error) {
      // Le fichier n'existe probablement pas, alors on le crée
      await fs.writeFile(dataFilePath, JSON.stringify([], null, 2));
    }

    // Ajoute les nouvelles données au tableau
    jsonData.push(speedTestData);

    // Écrit les données dans le fichier JSON
    console.log("📝 Write data");
    await fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2));
    console.log("");
  } catch (err: any) {
    console.error("Erreur lors du test de vitesse :", err.message);
    process.exit(1); // Quitte le script avec un code d'erreur
  }
};

// Planifie l'exécution du script
(async () => {
  console.log(`🌍 ${APP_MODE}`);
  console.log("");

  // Exécute la fonction initiale
  await launchSpeedTest();

  // Définis la fréquence de la tâche en fonction de l'environnement
  if (APP_MODE.includes("PRODUCTION")) {
    // Utilise cron pour planifier l'exécution récurrente
    cron.schedule("*/15 * * * *", async () => {
      await launchSpeedTest();
    });
  }
  if (APP_MODE.includes("DEVELOPMENT")) {
    // Utilise cron pour planifier l'exécution récurrente
    cron.schedule("* * * * *", async () => {
      await launchSpeedTest();
    });
  }
})();
