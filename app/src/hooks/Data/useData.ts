import { DataContext } from "@/context/Data.context";
import { useContext } from "react";

export const useData = () => {
  return useContext(DataContext);
};
