import { ISpeedTestData } from "@/data/interface/ISpeedTestData";
import { Card, CardHeader, CardTitle, CardContent } from "@ui/card";
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
            <p>{values.download} ms</p>
          </div>
          <div className="flex flex-row gap-2">
            <ArrowUpSquare />
            <p>{values.upload} ms</p>
          </div>
          <div className="flex flex-row gap-2">
            <Gauge />
            <p>{values.ping} ms</p>
          </div>
        </div>
      );
    }
    return <p>Chargement...</p>;
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
