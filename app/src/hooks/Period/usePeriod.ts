import { PeriodContext } from "@/context/Period.context";
import { useContext } from "react";

export const usePeriod = () => {
  return useContext(PeriodContext);
};
