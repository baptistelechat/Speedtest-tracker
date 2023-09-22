import { useState } from "react";
import { Button } from "@ui/button";
import { Calendar } from "@ui/calendar";
import { useUpdatePeriod } from "@/hooks/Period/useUpdatePeriod";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { disabledDays } from "@/data/utils/disabledDays";

dayjs.extend(isoWeek);

const CalendarDialogWeek = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [week, setWeek] = useState<number | undefined>(dayjs().isoWeek());

  const setPeriod = useUpdatePeriod();

  const handleSelect = (date: Date | undefined) => {
    setDate(date);
    setWeek(dayjs(date).isoWeek());
  };

  const handleValidation = () => {
    if (date) {
      const close = document.getElementById("CalendarDialogWeekClose");

      setPeriod(`week/${week}`);
      close?.click();
    }
  };

  if (week === undefined) {
    return <></>;
  }

  return (
    <>
      <DialogPrimitive.Close id={"CalendarDialogWeekClose"} />
      <div className="w-full p-4 flex flex-col justify-center items-center gap-4">
        <Calendar
          mode="single"
          fixedWeeks
          ISOWeek
          disabled={disabledDays()}
          selected={date}
          onSelect={(date) => handleSelect(date)}
          className="w-fit rounded-md border"
        />
        <p>Semaine sélectionnée : {week}</p>
      </div>
      <div className="w-full flex justify-end">
        <Button className="w-fit" onClick={handleValidation}>
          Valider
        </Button>
      </div>
    </>
  );
};

export default CalendarDialogWeek;
