import { translateOption } from "@/data/utils/translateOption";
import { usePeriod } from "@/hooks/Period/usePeriod";
import { useUpdatePeriod } from "@/hooks/Period/useUpdatePeriod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@ui/select";
import CalendarDialog from "./CalendarDialog/CalendarDialog";

const PeriodSelect = () => {
  const period = usePeriod();
  const setPeriod = useUpdatePeriod();

  const options = [
    "day/today",
    "day/yesterday",
    "day/custom",
    "week/current",
    "week/previous",
    "week/custom",
    "month/current",
    "month/previous",
    "month/custom",
  ];

  const handleValueChange = (option: string) => {
    if (option.includes("custom")) {
      const calendarDialogButtonTrigger = document.getElementById(
        "CalendarDialogTrigger"
      ) as HTMLButtonElement;
      calendarDialogButtonTrigger.click();
    }
    setPeriod(option);
  };

  return (
    <div className="flex gap-4">
      <div className="flex gap-2 items-center text-base font-normal">
        <CalendarDialog />
        <p>Période sélectionnée :</p>
        <Select
          onValueChange={(option: string) => handleValueChange(option)}
          defaultValue={period}
        >
          <SelectTrigger className="w-52 ">
            <SelectValue placeholder={period} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {translateOption(option)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PeriodSelect;
