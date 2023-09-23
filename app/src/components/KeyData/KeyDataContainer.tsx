import KeyDataItem from "./KeyDataItem";
import { usePeriod } from "@/hooks/Period/usePeriod";
import { getPeriodDescription } from "@/data/utils/getPeriodDescription";
import { useKeyData } from "@/hooks/KeyData/useKeyData";

const KeyDataContainer = () => {
  const period = usePeriod();
  const keyData = useKeyData();

  const entries = Object.entries(keyData);

  const getDescription = (title: string, values: any) => {
    if (
      values.download === "-" &&
      values.upload === "-" &&
      values.ping === "-"
    ) {
      return "Données indisponibles";
    }
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

  return (
    <div className="w-1/2 h-full grid grid-cols-2 gap-4">
      <div className="grid gap-4">
        {entries.slice(0, 3).map(([title, values]) => (
          <KeyDataItem
            key={title}
            title={title}
            description={
              !period.includes("custom") ? getDescription(title, values) : ""
            }
            values={values}
          />
        ))}
      </div>
      <div className="grid gap-4">
        {entries.slice(3).map(([title, values]) => (
          <KeyDataItem
            key={title}
            title={title}
            description={
              !period.includes("custom") ? getDescription(title, values) : ""
            }
            values={values}
          />
        ))}
      </div>
    </div>
  );
};

export default KeyDataContainer;
