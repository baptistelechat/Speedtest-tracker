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

interface IPeriodSelectProps {
  style?: string;
}

const PeriodSelect = ({ style }: IPeriodSelectProps) => {
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
      <div className={`${style} flex items-center text-base font-normal`}>
        <CalendarDialog />
        <p className="hidden sm:block">Période sélectionnée :</p>
        <Select
          onValueChange={(option: string) => handleValueChange(option)}
          defaultValue={period}
        >
          <SelectTrigger className="w-52">
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
