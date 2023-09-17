import { ISpeedTestData } from "@/data/interface/ISpeedTestData";
import {
  Table,
  TableBody,
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
import { useEffect } from "react";
import { Button } from "../ui/button";
import { openInNewTab } from "@/data/utils/openInNewTab";
import { getIndexById } from "@/data/utils/getIndexById";
import { ProgressIcon } from "@/data/utils/progressIcon";
import { Skeleton } from "@ui/skeleton";

interface ISpeedTestDataTableProps {
  data: ISpeedTestData[];
  setData: React.Dispatch<React.SetStateAction<ISpeedTestData[]>>;
  period: string;
  itemPerPage: string;
  pageIndex: number;
  setMaxPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

const SpeedTestDataTable = ({
  data,
  setData,
  period,
  itemPerPage,
  pageIndex,
  setMaxPageIndex,
}: ISpeedTestDataTableProps) => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const pageData = () => {
    const maxFullPage = Math.floor(data.length / Number(itemPerPage));
    setMaxPageIndex(maxFullPage + 1);

    if (maxFullPage >= pageIndex) {
      return data
        .slice(
          data.length - Number(itemPerPage) * pageIndex,
          data.length - Number(itemPerPage) * pageIndex + Number(itemPerPage)
        )
        .reverse();
    } else {
      return data
        .slice(0, data.length - maxFullPage * Number(itemPerPage))
        .reverse();
    }
  };

  useEffect(() => {
    // Fonction pour récupérer les données via fetch
    const fetchData = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}/api/speedTest/${period}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, [period]);

  if (data.length === 0) {
    return (
      <div className="w-full flex flex-row justify-between">
        <Skeleton className="w-1/6 h-4 rounded-full" />
        <Skeleton className="w-1/6 h-4 rounded-full" />
        <Skeleton className="w-1/6 h-4 rounded-full" />
        <Skeleton className="w-1/6 h-4 rounded-full" />
        <Skeleton className="w-1/6 h-4 rounded-full" />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <div className="flex gap-2 items-center">
              <CalendarDays />
              Date et heure
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-2 items-center">
              <Link />
              ID
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-2 items-center">
              <ArrowDownSquare />
              Download (débit descendant)
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-2 items-center">
              <ArrowUpSquare />
              Upload (débit ascendant)
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-2 items-center">
              <Gauge />
              Ping
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pageData().map((speedTest) => (
          <TableRow key={getIndexById(data, speedTest.id)}>
            <TableCell className="font-medium">{speedTest.timestamp}</TableCell>
            <TableCell>
              <Button
                className="text-left"
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
            <TableCell>
              <div className="flex gap-2 items-center">
                {speedTest.download} Mbps
                {ProgressIcon({
                  data: data,
                  index: getIndexById(data, speedTest.id),
                  type: "download",
                })}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2 items-center">
                {speedTest.upload} Mbps
                {ProgressIcon({
                  data: data,
                  index: getIndexById(data, speedTest.id),
                  type: "upload",
                })}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2 items-center">
                {speedTest.ping} ms
                {ProgressIcon({
                  data: data,
                  index: getIndexById(data, speedTest.id),
                  type: "ping",
                })}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SpeedTestDataTable;
