import { Card, CardHeader, CardTitle, CardContent } from "@ui/card";
import SpeedTestDataTable from "./SpeedTestDataTable";
import { useEffect, useState } from "react";
import SpeedTestDataTableControls from "./SpeedTestDataTableControls";
import { usePeriod } from "@/hooks/Period/usePeriod";
import { useData } from "@/hooks/Data/useData";

const SpeedTestDataTableContainer = () => {
  const [itemPerPage, setItemPerPage] = useState("10");
  const [pageIndex, setPageIndex] = useState(1);
  const [maxPageIndex, setMaxPageIndex] = useState(0);

  const period = usePeriod();
  const data = useData()

  useEffect(() => {
    setPageIndex(1);
  }, [period]);

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
              style="hidden sm:flex"
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
