import { translateOption } from "@/data/utils/translateOption";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@ui/select";

interface IPeriodSelectProps {
  period: string;
  setPeriod: React.Dispatch<React.SetStateAction<string>>;
}

const PeriodSelect = ({ period, setPeriod }: IPeriodSelectProps) => {
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

  return (
    <div className="flex gap-4">
      <div className="flex gap-2 items-center text-base font-normal">
        <p>Période sélectionnée :</p>
        <Select onValueChange={setPeriod} defaultValue={period}>
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
