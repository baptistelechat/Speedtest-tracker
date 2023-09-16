import { ArrowUpRight, ArrowDownRight, Scale } from "lucide-react";
import { ISpeedTestData } from "../interface/ISpeedTestData";

interface IProgressIconProps {
  data: ISpeedTestData[];
  index: number;
  type: "download" | "upload" | "ping";
}

export const ProgressIcon = ({ data, index, type }: IProgressIconProps) => {
  const dataLength = data.length;

  if (index === 0) {
    return <></>;
  }

  if (index < dataLength) {
    const current = Number(data[index][type]);
    const previous = Number(data[index - 1][type]);

    if (current > previous) {
      return <ArrowUpRight className="text-green-500" />;
    }

    if (current < previous) {
      return <ArrowDownRight className="text-red-500" />;
    }

    if (current === previous) {
      return <Scale className="text-yellow-500" />;
    }
  }
};
