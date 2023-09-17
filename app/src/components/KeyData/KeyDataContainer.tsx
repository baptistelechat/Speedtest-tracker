import { useEffect, useState } from "react";
import KeyDataItem from "./KeyDataItem";
import { IKeyData } from "@/data/interface/IKeyData";
import { usePeriod } from "@/hooks/Period/usePeriod";

const KeyDataContainer = () => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  
  const period = usePeriod();

  const initialKeyDataState: IKeyData = {
    Moyenne: "",
    Minimum: "",
    Maximum: "",
    "1er Quartile (Q1)": "",
    Médiane: "",
    "3ème Quartile (Q3)": "",
  };

  const [data, setData] = useState(initialKeyDataState);
  const entries = Object.entries(data);

  useEffect(() => {
    // Fonction pour récupérer les données via fetch
    const fetchData = async () => {
      try {
        const averageResponse = await fetch(
          `${VITE_API_URL}/api/speedTest/${period}/average`
        );
        const averageResult = await averageResponse.json();
        setData((prevData) => ({
          ...prevData,
          Moyenne: averageResult,
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
      try {
        const averageResponse = await fetch(
          `${VITE_API_URL}/api/speedTest/${period}/min`
        );
        const averageResult = await averageResponse.json();
        setData((prevData) => ({
          ...prevData,
          Minimum: averageResult,
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
      try {
        const averageResponse = await fetch(
          `${VITE_API_URL}/api/speedTest/${period}/max`
        );
        const averageResult = await averageResponse.json();
        setData((prevData) => ({
          ...prevData,
          Maximum: averageResult,
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
      try {
        const averageResponse = await fetch(
          `${VITE_API_URL}/api/speedTest/${period}/q1`
        );
        const averageResult = await averageResponse.json();
        setData((prevData) => ({
          ...prevData,
          "1er Quartile (Q1)": averageResult,
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
      try {
        const averageResponse = await fetch(
          `${VITE_API_URL}/api/speedTest/${period}/median`
        );
        const averageResult = await averageResponse.json();
        setData((prevData) => ({
          ...prevData,
          Médiane: averageResult,
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
      try {
        const averageResponse = await fetch(
          `${VITE_API_URL}/api/speedTest/${period}/q3`
        );
        const averageResult = await averageResponse.json();
        setData((prevData) => ({
          ...prevData,
          "3ème Quartile (Q3)": averageResult,
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, [period]);

  return (
    <div className="w-1/2 h-full grid grid-cols-2 gap-4">
      <div className="grid gap-4">
        {entries.slice(0, 3).map(([title, value]) => (
          <KeyDataItem key={title} title={title} values={value} />
        ))}
      </div>
      <div className="grid gap-4">
        {entries.slice(3).map(([title, value]) => (
          <KeyDataItem key={title} title={title} values={value} />
        ))}
      </div>
    </div>
  );
};

export default KeyDataContainer;
