export const getCurrentTimestamp = (shortDateStyle) => {
  const now = new Date();
  const options = {
    timeZone: "Europe/Paris",
    dateStyle: shortDateStyle ? "short" : undefined,
  }; // Set the desired time zone
  return now.toLocaleString("fr-FR", options);
};
