// Fonction pour récupérer le numéro de semaine
export const getWeekNumber = (date: Date) => {
  const currentDate = new Date(date);
  currentDate.setHours(0, 0, 0, 0);
  const startOfYear = new Date(currentDate.getFullYear(), 0, 2);
  const days = Math.floor(
    (currentDate.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
  );
  const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
  return weekNumber;
};
