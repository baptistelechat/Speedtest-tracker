import { useState } from "react";
import { Button } from "@ui/button";
import { Calendar } from "@ui/calendar";
import { useUpdatePeriod } from "@/hooks/Period/useUpdatePeriod";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { disabledDays } from "@/data/utils/disabledDays";

const CalendarDialogDay = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

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
          disabled={disabledDays()}
          selected={date}
          onSelect={setDate}
          className="w-fit rounded-md border"
        />
        <p>
          Date sélectionnée :{" "}
          {getFormattedDate({
            date: date,
            shortDateStyle: true,
          })}
        </p>
      </div>
      <div className="w-full flex justify-end">
        <Button className="w-fit" onClick={handleValidation}>
          Valider
        </Button>
      </div>
    </>
  );
};

export default CalendarDialogDay;
