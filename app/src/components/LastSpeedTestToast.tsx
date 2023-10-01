import { ISpeedTestData } from "@/data/interface/ISpeedTestData";
import { ArrowDownSquare, ArrowUpSquare, Gauge } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { Button } from "@ui/button";

const LastSpeedTestToast = () => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const { toast } = useToast();

  const handleGetLastSpeedTest = async () => {
    try {
      const response = await fetch(`${VITE_API_URL}/api/speedTest/day/last`);
      if (response.ok) {
        const result = (await response.json()) as ISpeedTestData;

        toast({
          title: "🚀 Dernier SpeedTest",
          description: `${result.timestamp}`,
          contentElement: (
            <div>
              <div className="flex flex-row gap-2">
                <ArrowDownSquare />
                <p>{result.download} Mbps</p>
              </div>
              <div className="flex flex-row gap-2">
                <ArrowUpSquare />
                <p>{result.upload} Mbps</p>
              </div>
              <div className="flex flex-row gap-2">
                <Gauge />
                <p>{result.ping} ms</p>
              </div>
            </div>
          ),
        });
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => handleGetLastSpeedTest()}
    >
      <Gauge className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
};

export default LastSpeedTestToast;
