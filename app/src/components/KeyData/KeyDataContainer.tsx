import { useEffect, useState } from "react";
import KeyDataItem from "./KeyDataItem";
import { IKeyData } from "@/data/interface/IKeyData";
import { usePeriod } from "@/hooks/Period/usePeriod";
import { getPeriodDescription } from "@/data/utils/getPeriodDescription";

const KeyDataContainer = () => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const period = usePeriod();

  const initialKeyDataState: IKeyData = {
    Moyenne: {
      id: "-",
      download: "-",
      upload: "-",
      ping: "-",
    },
    Minimum: {
      id: "-",
      download: "-",
      upload: "-",
      ping: "-",
    },
    Maximum: {
      id: "-",
      download: "-",
      upload: "-",
      ping: "-",
    },
    "1er Quartile (Q1)": {
      id: "-",
      download: "-",
      upload: "-",
      ping: "-",
    },
    Médiane: {
      id: "-",
      download: "-",
      upload: "-",
      ping: "-",
    },
    "3ème Quartile (Q3)": {
      id: "-",
      download: "-",
      upload: "-",
      ping: "-",
    },
  };

  const [data, setData] = useState(initialKeyDataState);
  const entries = Object.entries(data);

  const getDescription = (title: string) => {
    switch (title) {
      case "Moyenne":
        return `Valeurs moyennes ${getPeriodDescription(period)}`;
      case "Minimum":
        return `Valeurs minimales ${getPeriodDescription(period)}`;
      case "Maximum":
        return `Valeurs maximales ${getPeriodDescription(period)}`;
      case "1er Quartile (Q1)":
        return "25% des données sont inférieures à ...";
      case "Médiane":
        return "50% des données sont inférieures à ...";
      case "3ème Quartile (Q3)":
        return "75% des données sont inférieures à ...";
      default:
        return "";
    }
  };

  useEffect(() => {
    // Fonction pour récupérer les données via fetch
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${VITE_API_URL}/api/speedTest/${period}/average`
        );
        if (response.ok) {
          const result = await response.json();
          setData((prevData) => ({
            ...prevData,
            Moyenne: result,
          }));
        } else {
          console.log("first");
          setData((prevData) => ({
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
          setData((prevData) => ({
            ...prevData,
            Minimum: result,
          }));
        } else {
          setData((prevData) => ({
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
          setData((prevData) => ({
            ...prevData,
            Maximum: result,
          }));
        } else {
          setData((prevData) => ({
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
          setData((prevData) => ({
            ...prevData,
            "1er Quartile (Q1)": result,
          }));
        } else {
          setData((prevData) => ({
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
          setData((prevData) => ({
            ...prevData,
            Médiane: result,
          }));
        } else {
          setData((prevData) => ({
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
          setData((prevData) => ({
            ...prevData,
            "3ème Quartile (Q3)": result,
          }));
        } else {
          setData((prevData) => ({
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
      setData(initialKeyDataState);
    }
  }, [period]);

  return (
    <div className="w-1/2 h-full grid grid-cols-2 gap-4">
      <div className="grid gap-4">
        {entries.slice(0, 3).map(([title, value]) => (
          <KeyDataItem
            key={title}
            title={title}
            description={
              !period.includes("custom") ? getDescription(title) : ""
            }
            values={value}
          />
        ))}
      </div>
      <div className="grid gap-4">
        {entries.slice(3).map(([title, value]) => (
          <KeyDataItem
            key={title}
            title={title}
            description={
              !period.includes("custom") ? getDescription(title) : ""
            }
            values={value}
          />
        ))}
      </div>
    </div>
  );
};

export default KeyDataContainer;
