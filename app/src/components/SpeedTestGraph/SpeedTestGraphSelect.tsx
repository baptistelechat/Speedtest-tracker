import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@ui/select";
import {
  ArrowDownSquare,
  ArrowUpDown,
  ArrowUpSquare,
  Gauge,
} from "lucide-react";

type TOption = "download" | "upload" | "ping" | "download / upload";

interface ISpeedTestGraphSelectProps {
  type: TOption;
  setType: React.Dispatch<React.SetStateAction<TOption>>;
}

const SpeedTestGraphSelect = ({
  type,
  setType,
}: ISpeedTestGraphSelectProps) => {
  const options = ["download", "upload", "ping", "download / upload"];

  const Icon = (option: string) => {
    switch (option) {
      case "download":
        return <ArrowDownSquare className="h-5 w-5" />;
      case "upload":
        return <ArrowUpSquare className="h-5 w-5" />;
      case "ping":
        return <Gauge className="h-5 w-5" />;
      case "download / upload":
        return <ArrowUpDown className="h-5 w-5" />;
      default:
        return <ArrowDownSquare className="h-5 w-5" />;
    }
  };

  return (
    <Select
      onValueChange={(
        option: "download" | "upload" | "ping" | "download / upload"
      ) => setType(option)}
      defaultValue={type}
    >
      <SelectTrigger className="w-64 text-base font-normal">
        <SelectValue placeholder={type} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            <div className="flex flex-row gap-2 items-center">
              {Icon(option)}
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SpeedTestGraphSelect;
