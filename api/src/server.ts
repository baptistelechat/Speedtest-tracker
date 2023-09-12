import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";
import fs from "fs";

dotenv.config({ path: "../.env" });

// Express App
const app: Express = express();
const PORT = process.env.API_PORT;
const APP_MODE = process.env.APP_MODE;

// Middleware
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL_LOCAL as string,
      process.env.FRONTEND_URL_PUBLIC as string,
    ],
  })
);
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(express.urlencoded({ limit: "50mb" }));
app.use((req: Request, res: Response, next: NextFunction) => {
  const reqColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bgCyan";
      case "POST":
        return "bgGreen";
      case "DELETE":
        return "bgRed";
      case "PATCH":
        return "bgYellow";
      default:
        return "bgWhite";
    }
  };

  console.log(chalk[reqColor(req.method)](req.method, req.path));
  next();
});

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "🌍 Welcome to the app !" });
});

// Endpoint pour récupérer les données
app.get("/data/:filename", (req, res) => {
  try {
    const { filename } = req.params;
    const data = APP_MODE?.includes("UNIX_DEVELOPMENT")
      ? fs.readFileSync(`./data/${filename}.json`, "utf-8")
      : fs.readFileSync(`../script/data/${filename}.json`, "utf-8");
    res.json(JSON.parse(data));
  } catch (error: any) {
    res.status(500).json({
      error: `Erreur lors de la récupération des données - ${error.message}`,
    });
  }
});

// Listen requests
app.listen(PORT, () => {
  console.log(
    chalk.yellow(`⚡️[server]: Server is running at http://localhost:${PORT}`)
  );
});
