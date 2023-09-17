import { Card, CardHeader, CardTitle, CardContent } from "@ui/card";
import SpeedTestDataTable from "./SpeedTestDataTable";
import { useState } from "react";
import SpeedTestDataTableControls from "./SpeedTestDataTableControls";
import { usePeriod } from "@/hooks/Period/usePeriod";
import { ISpeedTestData } from "@/data/interface/ISpeedTestData";

const SpeedTestDataTableContainer = () => {
  const [data, setData] = useState<ISpeedTestData[]>([]);
  const [itemPerPage, setItemPerPage] = useState("10");
  const [pageIndex, setPageIndex] = useState(1);
  const [maxPageIndex, setMaxPageIndex] = useState(0);

  const period = usePeriod();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between">
          Tableau de données
          {data.length !== 0 ? (
            <SpeedTestDataTableControls
              itemPerPage={itemPerPage}
              setItemPerPage={setItemPerPage}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
              maxPageIndex={maxPageIndex}
            />
          ) : (
            <p className="text-red-300 italic font-normal text-base">
              Données indisponibles
            </p>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <SpeedTestDataTable
          data={data}
          setData={setData}
          period={period}
          itemPerPage={itemPerPage}
          pageIndex={pageIndex}
          setMaxPageIndex={setMaxPageIndex}
        />
        {data.length !== 0 ? (
          <SpeedTestDataTableControls
            itemPerPage={itemPerPage}
            setItemPerPage={setItemPerPage}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            maxPageIndex={maxPageIndex}
          />
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
};

export default SpeedTestDataTableContainer;
