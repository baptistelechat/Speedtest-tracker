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
import { Button } from "../ui/button";
import { openInNewTab } from "@/data/utils/openInNewTab";
import { getIndexById } from "@/data/utils/getIndexById";
import { ProgressIcon } from "@/data/utils/progressIcon";
import { Skeleton } from "@ui/skeleton";
import { useData } from "@/hooks/Data/useData";

interface ISpeedTestDataTableProps {
  itemPerPage: string;
  pageIndex: number;
  setMaxPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

const SpeedTestDataTable = ({
  itemPerPage,
  pageIndex,
  setMaxPageIndex,
}: ISpeedTestDataTableProps) => {
  const data = useData();

  const pageData = () => {
    if (data.length > 0) {
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
    }
    return [];
  };

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
