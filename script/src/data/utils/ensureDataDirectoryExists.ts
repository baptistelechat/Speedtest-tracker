import fs from "fs/promises";

export const ensureDataDirectoryExists = async () => {
  try {
    await fs.mkdir("./data", { recursive: true });
  } catch (error: any) {
    console.error(
      "Erreur lors de la création du répertoire data :",
      error.message
    );
    process.exit(1); // Quitte le script avec un code d'erreur
  }
};
