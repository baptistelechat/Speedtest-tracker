import { initialKeyDataState } from "@/data/constants/initialKeyDataState";
import { IKeyData } from "@/data/interface/IKeyData";
import { usePeriod } from "@/hooks/Period/usePeriod";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export const KeyDataContext = createContext<IKeyData>(initialKeyDataState);
export const KeyDataUpdateContext = createContext<
  Dispatch<SetStateAction<IKeyData>>
>(() => {});

interface IKeyDataContextProps {
  children: React.ReactNode;
}

const KeyDataProvider = (props: IKeyDataContextProps) => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const [keyData, setKeyData] = useState<IKeyData>(initialKeyDataState);
  const period = usePeriod();

  useEffect(() => {
    // Fonction pour récupérer les données via fetch
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${VITE_API_URL}/api/speedTest/${period}/average`
        );
        if (response.ok) {
          const result = await response.json();
          setKeyData((prevData) => ({
            ...prevData,
            Moyenne: result,
          }));
        } else {
          console.log("first");
          setKeyData((prevData) => ({
            ...prevData,
            Moyenne: {
              id: "-",
              download: "-",
              upload: "-",
              ping: "-",
            },
          }));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
      try {
        const response = await fetch(
          `${VITE_API_URL}/api/speedTest/${period}/min`
        );
        if (response.ok) {
          const result = await response.json();
          setKeyData((prevData) => ({
            ...prevData,
            Minimum: result,
          }));
        } else {
          setKeyData((prevData) => ({
            ...prevData,
            Minimum: {
              id: "-",
              download: "-",
              upload: "-",
              ping: "-",
            },
          }));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
      try {
        const response = await fetch(
          `${VITE_API_URL}/api/speedTest/${period}/max`
        );
        if (response.ok) {
          const result = await response.json();
          setKeyData((prevData) => ({
            ...prevData,
            Maximum: result,
          }));
        } else {
          setKeyData((prevData) => ({
            ...prevData,
            Maximum: {
              id: "-",
              download: "-",
              upload: "-",
              ping: "-",
            },
          }));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
      try {
        const response = await fetch(
          `${VITE_API_URL}/api/speedTest/${period}/q1`
        );
        if (response.ok) {
          const result = await response.json();
          setKeyData((prevData) => ({
            ...prevData,
            "1er Quartile (Q1)": result,
          }));
        } else {
          setKeyData((prevData) => ({
            ...prevData,
            "1er Quartile (Q1)": {
              id: "-",
              download: "-",
              upload: "-",
              ping: "-",
            },
          }));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
      try {
        const response = await fetch(
          `${VITE_API_URL}/api/speedTest/${period}/median`
        );
        if (response.ok) {
          const result = await response.json();
          setKeyData((prevData) => ({
            ...prevData,
            Médiane: result,
          }));
        } else {
          setKeyData((prevData) => ({
            ...prevData,
            Médiane: {
              id: "-",
              download: "-",
              upload: "-",
              ping: "-",
            },
          }));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
      try {
        const response = await fetch(
          `${VITE_API_URL}/api/speedTest/${period}/q3`
        );
        if (response.ok) {
          const result = await response.json();
          setKeyData((prevData) => ({
            ...prevData,
            "3ème Quartile (Q3)": result,
          }));
        } else {
          setKeyData((prevData) => ({
            ...prevData,
            "3ème Quartile (Q3)": {
              id: "-",
              download: "-",
              upload: "-",
              ping: "-",
            },
          }));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    if (!period.includes("custom")) {
      fetchData();
    } else {
      setKeyData(initialKeyDataState);
    }
  }, [period]);

  return (
    <KeyDataContext.Provider value={keyData}>
      <KeyDataUpdateContext.Provider value={setKeyData}>
        {props.children}
      </KeyDataUpdateContext.Provider>
    </KeyDataContext.Provider>
  );
};

export default KeyDataProvider;
