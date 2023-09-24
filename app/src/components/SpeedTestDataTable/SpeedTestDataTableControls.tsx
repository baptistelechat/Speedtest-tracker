import React from "react";
import SpeedTestDataTablePagination from "./SpeedTestDataTablePagination";
import SpeedTestDataTableSelect from "./SpeedTestDataTableSelect";

interface ISpeedTestDataTableControlsProps {
  itemPerPage: string;
  setItemPerPage: React.Dispatch<React.SetStateAction<string>>;
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  maxPageIndex: number;
  style?: string;
}

const SpeedTestDataTableControls = ({
  itemPerPage,
  setItemPerPage,
  pageIndex,
  setPageIndex,
  maxPageIndex,
  style,
}: ISpeedTestDataTableControlsProps) => {
  return (
    <div className={`${style} flex gap-4`}>
      <SpeedTestDataTableSelect
        itemPerPage={itemPerPage}
        setItemPerPage={setItemPerPage}
      />
      <SpeedTestDataTablePagination
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        maxPageIndex={maxPageIndex}
      />
    </div>
  );
};

export default SpeedTestDataTableControls;
