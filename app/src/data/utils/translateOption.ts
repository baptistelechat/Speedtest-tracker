export const translateOption = (option: string) => {
  switch (option) {
    case "day/today":
      return "Jour - Aujourd'hui";
    case "day/yesterday":
      return "Jour - Hier";
    case "day/custom":
      return "Jour - Personnalisée";
    case "week/current":
      return "Semaine - En cours";
    case "week/previous":
      return "Semaine - Précédent";
    case "week/custom":
      return "Semaine - Personnalisée";
    case "month/current":
      return "Mois - En cours";
    case "month/previous":
      return "Mois - Précédent";
    case "month/custom":
      return "Mois - Personnalisée";

    default:
      return "Jour - Aujourd'hui";
  }
};
