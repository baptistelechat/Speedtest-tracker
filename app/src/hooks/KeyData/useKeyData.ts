import { KeyDataContext } from "@/context/KeyData.context";
import { useContext } from "react";

export const useKeyData = () => {
  return useContext(KeyDataContext);
};
