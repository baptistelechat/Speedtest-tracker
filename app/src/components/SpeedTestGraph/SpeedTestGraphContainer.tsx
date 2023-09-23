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

const SpeedTestGraphContainer = () => {
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
    <Card className="w-1/2 h-full">
      <CardHeader>
        <CardTitle className="flex justify-between">
          SpeedTest Graph <SpeedTestGraphSelect type={type} setType={setType} />
        </CardTitle>
        <CardDescription>
          Visualisation des données pour la période en cours
        </CardDescription>
      </CardHeader>
      <CardContent>{SpeedTestGraph()}</CardContent>
    </Card>
  );
};

export default SpeedTestGraphContainer;
