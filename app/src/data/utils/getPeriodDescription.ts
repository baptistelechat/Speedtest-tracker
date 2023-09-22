import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

export const getPeriodDescription = (period: string) => {
  const now = dayjs();
  const yesterday = now.subtract(1, "days");
  const currentYear = dayjs().year();
  const currentMonth = dayjs().month() + 1;
  const currentWeek = dayjs().isoWeek();

  if (period === "day/today") {
    return `du ${now.format("DD/MM/YYYY")}`;
  }

  if (period === "day/yesterday") {
    return `du ${yesterday.format("DD/MM/YYYY")}`;
  }

  if (period.startsWith("day/")) {
    const date = period.split("/")[1];
    const YYYY = date.slice(0, 4);
    const MM = date.slice(4, 6);
    const DD = date.slice(6, 8);

    return `du ${DD}/${MM}/${YYYY}`;
  }

  if (period === "week/current") {
    const startDate = dayjs(`${currentYear}-01-01`, "YYYY-MM-DD")
      .startOf("week")
      .add(currentWeek - 1, "week")
      .add(1, "day");
    const endDate = startDate.endOf("week").add(1, "day");

    return `du ${startDate.format("DD/MM/YYYY")} au ${endDate.format(
      "DD/MM/YYYY"
    )}`;
  }

  if (period === "week/previous") {
    const startDate = dayjs(`${currentYear}-01-01`, "YYYY-MM-DD")
      .startOf("week")
      .add(currentWeek - 2, "week")
      .add(1, "day");
    const endDate = startDate.endOf("week").add(1, "day");

    return `du ${startDate.format("DD/MM/YYYY")} au ${endDate.format(
      "DD/MM/YYYY"
    )}`;
  }

  if (period.startsWith("week/")) {
    const weekNumber = period.split("/")[1];
    const currentYear = dayjs().year();
    const startDate = dayjs(`${currentYear}-01-01`, "YYYY-MM-DD")
      .startOf("week")
      .add(parseInt(weekNumber) - 1, "week")
      .add(1, "day");
    const endDate = startDate.endOf("week").add(1, "day");

    return `du ${startDate.format("DD/MM/YYYY")} au ${endDate.format(
      "DD/MM/YYYY"
    )}`;
  }

  if (period === "month/current") {
    const startDate = dayjs(`${currentYear}-${currentMonth}-01`, "YYYY-MM-DD");
    const endDate = startDate.endOf("month");

    return `du ${startDate.format("DD/MM/YYYY")} au ${endDate.format(
      "DD/MM/YYYY"
    )}`;
  }

  if (period === "month/previous") {
    const startDate = dayjs(
      `${currentYear}-${currentMonth}-01`,
      "YYYY-MM-DD"
    ).subtract(1, "month");
    const endDate = startDate.endOf("month");

    return `du ${startDate.format("DD/MM/YYYY")} au ${endDate.format(
      "DD/MM/YYYY"
    )}`;
  }

  if (period.startsWith("month/")) {
    const monthNumber = period.split("/")[1];
    const currentYear = dayjs().year(); // Année en cours

    const startDate = dayjs(`${currentYear}-${monthNumber}-01`, "YYYY-MM-DD");
    const endDate = startDate.endOf("month");

    return `du ${startDate.format("DD/MM/YYYY")} au ${endDate.format(
      "DD/MM/YYYY"
    )}`;
  }
};
