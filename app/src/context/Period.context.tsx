import { createContext, Dispatch, SetStateAction, useState } from "react";

export const PeriodContext = createContext<string>("");
export const PeriodUpdateContext = createContext<
  Dispatch<SetStateAction<string>>
>(() => []);

interface IRouterContextProps {
  children: React.ReactNode;
}

const PeriodProvider = (props: IRouterContextProps) => {
  const [router, setRouter] = useState<string>("day/today");

  return (
    <PeriodContext.Provider value={router}>
      <PeriodUpdateContext.Provider value={setRouter}>
        {props.children}
      </PeriodUpdateContext.Provider>
    </PeriodContext.Provider>
  );
};

export default PeriodProvider;
