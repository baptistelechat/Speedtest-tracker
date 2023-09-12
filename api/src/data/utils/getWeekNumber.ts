// Fonction pour récupérer le numéro de semaine
export const getWeekNumber = (d: Date): number => {
  const oneJan = new Date(d.getFullYear(), 0, 1);
  const timeDiff = d.getTime() - oneJan.getTime();
  const dayOfYear = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
  return Math.ceil(dayOfYear / 7);
};
