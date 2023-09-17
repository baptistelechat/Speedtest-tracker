import { Card, CardHeader, CardTitle, CardContent } from "@ui/card";
import SpeedTestDataTable from "./SpeedTestDataTable";
import { useState } from "react";
import SpeedTestDataTableControls from "./SpeedTestDataTableControls";
import { usePeriod } from "@/hooks/Period/usePeriod";

const SpeedTestDataTableContainer = () => {
  const [itemPerPage, setItemPerPage] = useState("10");
  const [pageIndex, setPageIndex] = useState(1);
  const [maxPageIndex, setMaxPageIndex] = useState(0);

  const period = usePeriod();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between">
          Tableau de données
          <SpeedTestDataTableControls
            itemPerPage={itemPerPage}
            setItemPerPage={setItemPerPage}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            maxPageIndex={maxPageIndex}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <SpeedTestDataTable
          period={period}
          itemPerPage={itemPerPage}
          pageIndex={pageIndex}
          setMaxPageIndex={setMaxPageIndex}
        />
        <SpeedTestDataTableControls
          itemPerPage={itemPerPage}
          setItemPerPage={setItemPerPage}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          maxPageIndex={maxPageIndex}
        />
      </CardContent>
    </Card>
  );
};

export default SpeedTestDataTableContainer;
