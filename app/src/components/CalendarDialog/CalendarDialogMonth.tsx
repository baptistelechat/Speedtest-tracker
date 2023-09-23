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
  const [monthNumber, setMonthNumber] = useState<number | undefined>(
    dayjs().month() + 1
  );

  const setPeriod = useUpdatePeriod();

  const handleSelect = (date: Date | undefined) => {
    setDate(date);
    setMonthNumber(dayjs(date).month() + 1);
  };

  const handleValidation = () => {
    if (date) {
      const close = document.getElementById("CalendarDialogWeekClose");

      setPeriod(`month/${monthNumber}`);
      close?.click();
    }
  };

  const goToToday = () => {
    setMonth(new Date());
    setDate(new Date());
    setMonthNumber(dayjs(new Date()).month() + 1);
  };

  if (monthNumber === undefined) {
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
          month={month}
          onMonthChange={setMonth}
          onSelect={(date) => handleSelect(date)}
          className="w-fit rounded-md border"
        />
        <p>Mois sélectionné : {monthNumber}</p>
        <Button
          disabled={isSameMonth(new Date(), month)}
          onClick={() => goToToday()}
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
