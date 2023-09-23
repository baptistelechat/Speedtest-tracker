import { createContext, Dispatch, SetStateAction, useState } from "react";

export const PeriodContext = createContext<string>("");
export const PeriodUpdateContext = createContext<
  Dispatch<SetStateAction<string>>
>(() => []);

interface IPeriodContextProps {
  children: React.ReactNode;
}

const PeriodProvider = (props: IPeriodContextProps) => {
  const [period, setPeriod] = useState<string>("day/today");

  return (
    <PeriodContext.Provider value={period}>
      <PeriodUpdateContext.Provider value={setPeriod}>
        {props.children}
      </PeriodUpdateContext.Provider>
    </PeriodContext.Provider>
  );
};

export default PeriodProvider;
