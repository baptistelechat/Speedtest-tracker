import { usePeriod } from "@/hooks/Period/usePeriod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@ui/dialog";
import { translateOption } from "@/data/utils/translateOption";
import CalendarDialogDay from "./CalendarDialogDay";
import CalendarDialogWeek from "./CalendarDialogWeek";
import CalendarDialogMonth from "./CalendarDialogMonth";
import { CalendarDays } from "lucide-react";

const CalendarDialog = () => {
  const period = usePeriod();

  const dialogDescription = () => {
    switch (period) {
      case "day/custom":
        return "Sélectionner une date spécifique.";
      case "week/custom":
        return "Sélectionner une semaine.";
      case "month/custom":
        return "Sélectionner un mois.";

      default:
        return "-";
    }
  };

  const CalendarPicker = () => {
    if (period === "day/custom") {
      return <CalendarDialogDay />;
    }
    if (period === "week/custom") {
      return <CalendarDialogWeek />;
    }
    if (period === "month/custom") {
      return <CalendarDialogMonth />;
    }
    return <></>;
  };

  return (
    <Dialog>
      <DialogTrigger id="CalendarDialogTrigger" />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-row gap-2 items-center">
              <CalendarDays className="h-6 w-6" />
              {translateOption(period)}
            </div>
          </DialogTitle>
          <DialogDescription>{dialogDescription()}</DialogDescription>
          {CalendarPicker()}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarDialog;
