import { useState } from "react";
import { Button } from "@ui/button";
import { Calendar } from "@ui/calendar";
import { useUpdatePeriod } from "@/hooks/Period/useUpdatePeriod";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { disabledDays } from "@/data/utils/disabledDays";
import { fr } from "date-fns/locale";
import { isSameMonth } from "date-fns";
import { CalendarCheck2, Pin } from "lucide-react";

dayjs.extend(isoWeek);

const CalendarDialogWeek = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date>(new Date());
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

  const goToToday = ()=> {
    setMonth(new Date());
    setDate(new Date());
    setWeek(dayjs(new Date()).isoWeek());
  }

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
          locale={fr}
          disabled={disabledDays()}
          selected={date}
          onSelect={(date) => handleSelect(date)}
          month={month}
          onMonthChange={setMonth}
          className="w-fit rounded-md border"
        />
        <p>Semaine sélectionnée : {week}</p>
        <Button
          disabled={isSameMonth(new Date(), month)}
          onClick={() => {
            goToToday();
          }}
        >
          <Pin className="mr-2 h-5 w-5" />
          Aujourd'hui
        </Button>
      </div>
      <div className="w-full flex justify-end">
        <Button className="w-fit" onClick={handleValidation}>
          <CalendarCheck2 className="mr-2 h-5 w-5" />
          Valider
        </Button>
      </div>
    </>
  );
};

export default CalendarDialogWeek;
