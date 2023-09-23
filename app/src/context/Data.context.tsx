import { ISpeedTestData } from "@/data/interface/ISpeedTestData";
import { usePeriod } from "@/hooks/Period/usePeriod";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export const DataContext = createContext<ISpeedTestData[]>([]);
export const DataUpdateContext = createContext<
  Dispatch<SetStateAction<ISpeedTestData[]>>
>(() => []);

interface IDataContextProps {
  children: React.ReactNode;
}

const DataProvider = (props: IDataContextProps) => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const [data, setData] = useState<ISpeedTestData[]>([]);
  const period = usePeriod();

  useEffect(() => {
    // Fonction pour récupérer les données via fetch
    const fetchData = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}/api/speedTest/${period}`);
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    if (!period.includes("custom")) {
      fetchData();
    } else {
      setData([]);
    }
  }, [period]);

  return (
    <DataContext.Provider value={data}>
      <DataUpdateContext.Provider value={setData}>
        {props.children}
      </DataUpdateContext.Provider>
    </DataContext.Provider>
  );
};

export default DataProvider;
