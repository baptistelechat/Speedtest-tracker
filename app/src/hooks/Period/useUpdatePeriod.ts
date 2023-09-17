import { PeriodUpdateContext } from "@/context/Period.context";
import { useContext } from "react";

export const useUpdatePeriod = () => {
  return useContext(PeriodUpdateContext);
};
