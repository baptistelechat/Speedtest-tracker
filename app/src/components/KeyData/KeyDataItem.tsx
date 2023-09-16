import { ISpeedTestData } from "@/data/interface/ISpeedTestData";
import { Card, CardHeader, CardTitle, CardContent } from "@ui/card";
import { Skeleton } from "@ui/skeleton";
import { ArrowDownSquare, ArrowUpSquare, Gauge } from "lucide-react";

interface IKeyDataItemProps {
  title: string;
  values: ISpeedTestData | string;
}

const KeyDataItem = ({ title, values }: IKeyDataItemProps) => {
  const speedTestData = () => {
    if (typeof values !== "string") {
      return (
        <div>
          <div className="flex flex-row gap-2">
            <ArrowDownSquare />
            <p>{values.download} Mbps</p>
          </div>
          <div className="flex flex-row gap-2">
            <ArrowUpSquare />
            <p>{values.upload} Mbps</p>
          </div>
          <div className="flex flex-row gap-2">
            <Gauge />
            <p>{values.ping} ms</p>
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="w-1/2 h-4 rounded-full" />
        <Skeleton className="w-1/2 h-4 rounded-full" />
        <Skeleton className="w-1/2 h-4 rounded-full" />
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{speedTestData()}</CardContent>
    </Card>
  );
};

export default KeyDataItem;
