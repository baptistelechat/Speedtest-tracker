import { ISpeedTestData } from "@/data/interface/ISpeedTestData";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/table";
import {
  ArrowDownSquare,
  ArrowUpSquare,
  CalendarDays,
  Gauge,
  Link,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

const SpeedTestDataTable = () => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const PERIOD = "today";

  const [data, setData] = useState<ISpeedTestData[]>([]);

  useEffect(() => {
    // Fonction pour récupérer les données via fetch
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${VITE_API_URL}/api/speedTest/day/${PERIOD}`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  const openInNewTab = (url: string) => window.open(url, "_blank");

  return (
    <Table>
      <TableCaption>Une liste des 20 premiers speedtest.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            <div className="flex gap-1 items-center">
              <CalendarDays />
              Date et heure
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-1 items-center">
              <Link />
              ID
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-1 items-center">
              <ArrowDownSquare />
              Download (débit descendant)
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-1 items-center">
              <ArrowUpSquare />
              Upload (débit ascendant)
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-1 items-center">
              <Gauge />
              Ping
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.slice(0, 10).map((speedTest) => (
          <TableRow>
            <TableCell className="font-medium">{speedTest.timestamp}</TableCell>
            <TableCell>
              <Button
                variant="link"
                onClick={() =>
                  openInNewTab(
                    `https://www.speedtest.net/fr/result/c/${speedTest.id}`
                  )
                }
              >
                {speedTest.id}
              </Button>
            </TableCell>
            <TableCell>{speedTest.download} Mbps</TableCell>
            <TableCell>{speedTest.upload} Mbps</TableCell>
            <TableCell>{speedTest.ping} ms</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SpeedTestDataTable;
