export const getCurrentTimestamp = (
  shortDateStyle?: boolean,
  filename?: boolean
): string => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Europe/Paris",
    dateStyle: shortDateStyle ? "short" : undefined,
  }; // Set the desired time zone

  if (filename) {
    const date = now.toLocaleString("fr-FR", options).split("/");
    return `${date[2]}${date[1]}${date[0]}`;
  }
  return now.toLocaleString("fr-FR", options);
};
