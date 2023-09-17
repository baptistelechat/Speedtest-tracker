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
import { translateOption } from "@/data/utils/translateOption";

const Dashboard = ({ children }: PropsWithChildren) => {
  const period = usePeriod();

  return (
    <Card className="m-6">
      <CardHeader>
        <CardTitle className="flex justify-between">
          🚀 Dashboard
          <PeriodSelect />
        </CardTitle>
        <CardDescription>
          {`Compte-rendu pour la période "${translateOption(period)}"`}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row">{children}</CardContent>
    </Card>
  );
};

export default Dashboard;
