import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@ui/card";
import SpeedTestGraphDownload from "./SpeedTestGraphDownload";
import SpeedTestGraphSelect from "./SpeedTestGraphSelect";
import { useState } from "react";
import SpeedTestGraphPing from "./SpeedTestGraphPing";
import SpeedTestGraphUpload from "./SpeedTestGraphUpload";
import SpeedTestGraphDownloadUpload from "./SpeedTestGraphDownloadUpload";
import { useData } from "@/hooks/Data/useData";

const SpeedTestGraphContainer = () => {
  const data = useData();
  const [type, setType] = useState<
    "download" | "upload" | "ping" | "download / upload"
  >("download");

  const SpeedTestGraph = () => {
    switch (type) {
      case "download":
        return <SpeedTestGraphDownload />;
      case "upload":
        return <SpeedTestGraphUpload />;
      case "ping":
        return <SpeedTestGraphPing />;
      case "download / upload":
        return <SpeedTestGraphDownloadUpload />;

      default:
        break;
    }
  };

  return (
    <Card className="w-full xl:w-1/2 h-full">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between items-center gap-4">
          SpeedTest Graph
          <SpeedTestGraphSelect
            type={type}
            setType={setType}
            style="hidden sm:flex"
          />
        </CardTitle>
        <CardDescription className={data.length === 0 ? "text-red-300" : ""}>
          {data.length === 0
            ? "Données indisponibles"
            : "Visualisation des données pour la période en cours"}
        </CardDescription>
        <SpeedTestGraphSelect
          type={type}
          setType={setType}
          style="flex sm:hidden"
        />
      </CardHeader>
      <CardContent>{SpeedTestGraph()}</CardContent>
    </Card>
  );
};

export default SpeedTestGraphContainer;
