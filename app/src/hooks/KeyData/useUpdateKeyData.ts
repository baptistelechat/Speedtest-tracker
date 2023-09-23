import { KeyDataUpdateContext } from "@/context/KeyData.context";
import { useContext } from "react";

export const useUpdateKeyData = () => {
  return useContext(KeyDataUpdateContext);
};
