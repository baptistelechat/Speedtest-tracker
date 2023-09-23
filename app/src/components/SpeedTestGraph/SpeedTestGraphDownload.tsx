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

const SpeedTestGraphDownload = () => {
  const data = useData();
  const keyData = useKeyData();

  const offset = 1;
  let minDownloadData = 1;
  let maxDownloadData = 1;

  const min = keyData.Minimum as ISpeedTestData;
  const max = keyData.Maximum as ISpeedTestData;

  if (data.length === 0 || max.download === "-" || min.download === "-") {
    return <Skeleton className="w-3/4 h-4 rounded-full" />;
  } else {
    minDownloadData =
      Math.floor(Number(min.download) - offset) < 0
        ? 0
        : Math.floor(Number(min.download) - offset);
    maxDownloadData = Math.ceil(Number(max.download) + offset);
  }

  return (
    <ResponsiveContainer width="100%" height={450} className="-ml-10">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" angle={-90} textAnchor="end" height={100} />
        <YAxis
          domain={[
            (dataMin: any) => (dataMin / dataMin) * minDownloadData,
            (dataMax: any) => (dataMax / dataMax) * maxDownloadData,
          ]}
          tickCount={15}
        />
        <Tooltip />
        <Legend verticalAlign="top" height={42} />
        <Line type="monotone" dataKey="download" dot={false} stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SpeedTestGraphDownload;
