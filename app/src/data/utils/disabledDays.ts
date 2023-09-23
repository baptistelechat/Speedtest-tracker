import dayjs from "dayjs";

export const disabledDays = () => {
  
  const now = dayjs();
  const tomorrow = now.add(1, "day").toDate();

  return [
    { from: new Date(1970, 0, 1), to: new Date(2023, 0, 0) },
    { from: tomorrow, to: new Date(2999, 11, 29) },
  ];
};
