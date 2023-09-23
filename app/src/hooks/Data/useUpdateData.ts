import { DataUpdateContext } from "@/context/Data.context";
import { useContext } from "react";

export const useUpdateData = () => {
  return useContext(DataUpdateContext);
};
