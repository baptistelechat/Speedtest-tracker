import { useState } from "react";
import { Button } from "@ui/button";
import { Calendar } from "@ui/calendar";
import { useUpdatePeriod } from "@/hooks/Period/useUpdatePeriod";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { disabledDays } from "@/data/utils/disabledDays";
import { fr } from "date-fns/locale";
import { isSameMonth } from "date-fns";
import { CalendarCheck2, Pin } from "lucide-react";

const CalendarDialogDay = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date>(new Date());

  const setPeriod = useUpdatePeriod();

  const getFormattedDate = ({
    date,
    shortDateStyle,
    filename,
  }: {
    date: Date;
    shortDateStyle?: boolean;
    filename?: boolean;
  }): string => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Europe/Paris",
      dateStyle: shortDateStyle ? "short" : undefined,
    }; // Set the desired time zone

    if (filename) {
      const splitDate = date.toLocaleString("fr-FR", options).split("/");
      return `${splitDate[2]}${splitDate[1]}${splitDate[0]}`;
    }
    return date.toLocaleString("fr-FR", options);
  };

  const handleValidation = () => {
    if (date) {
      const close = document.getElementById("CalendarDialogDayClose");

      setPeriod(
        `day/${getFormattedDate({
          date: date,
          shortDateStyle: true,
          filename: true,
        })}`
      );
      close?.click();
    }
  };

  const goToToday = () => {
    setMonth(new Date());
  };

  if (date === undefined) {
    return <></>;
  }

  return (
    <>
      <DialogPrimitive.Close id={"CalendarDialogDayClose"} />
      <div className="w-full p-4 flex flex-col justify-center items-center gap-4">
        <Calendar
          mode="single"
          fixedWeeks
          ISOWeek
          locale={fr}
          disabled={disabledDays()}
          selected={date}
          onSelect={setDate}
          month={month}
          onMonthChange={setMonth}
          className="w-fit rounded-md border"
        />
        <p>
          Date sélectionnée :{" "}
          {getFormattedDate({
            date: date,
            shortDateStyle: true,
          })}
        </p>
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

export default CalendarDialogDay;
