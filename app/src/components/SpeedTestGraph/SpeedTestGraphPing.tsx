import { useData } from "@/hooks/Data/useData";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@ui/skeleton";
import { useKeyData } from "@/hooks/KeyData/useKeyData";
import { ISpeedTestData } from "@/data/interface/ISpeedTestData";

const SpeedTestGraphPing = () => {
  const data = useData();
  const keyData = useKeyData();

  const offset = 100;
  let minPingData = 1;
  let maxPingData = 1;

  const min = keyData.Minimum as ISpeedTestData;
  const max = keyData.Maximum as ISpeedTestData;

  if (data.length === 0 || max.download === "-" || min.download === "-") {
    return <Skeleton className="w-3/4 h-4 rounded-full" />;
  } else {
    minPingData = Math.floor(Number(min.ping) - offset);
    maxPingData = Math.ceil(Number(max.ping) + offset);
  }

  return (
    <ResponsiveContainer width="100%" height={450} className="-ml-10">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" angle={-90} textAnchor="end" height={100} />
        <YAxis
          domain={[
            (dataMin: any) => (dataMin / dataMin) * minPingData,
            (dataMax: any) => (dataMax / dataMax) * maxPingData,
          ]}
          tickCount={15}
        />
        <Tooltip />
        <Legend verticalAlign="top" height={42} />
        <Line type="monotone" dataKey="ping" dot={false} stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SpeedTestGraphPing;
