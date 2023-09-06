export const getCurrentTimestamp = (shortDateStyle?: boolean): string => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Europe/Paris",
    dateStyle: shortDateStyle ? "short" : undefined,
  }; // Set the desired time zone
  return now.toLocaleString("fr-FR", options);
};
