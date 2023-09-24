import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@ui/card";
import { PropsWithChildren } from "react";
import PeriodSelect from "./PeriodSelect";
import { usePeriod } from "@/hooks/Period/usePeriod";
import { getPeriodDescription } from "@/data/utils/getPeriodDescription";

const Dashboard = ({ children }: PropsWithChildren) => {
  const period = usePeriod();

  return (
    <Card className="m-6">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between items-center">
          🚀 Dashboard
          <PeriodSelect style="hidden sm:flex sm:gap-2" />
        </CardTitle>
        <CardDescription>
          Compte-rendu {getPeriodDescription(period)}
        </CardDescription>
        <PeriodSelect style="flex sm:hidden" />
      </CardHeader>
      <CardContent className="flex flex-row">{children}</CardContent>
    </Card>
  );
};

export default Dashboard;
