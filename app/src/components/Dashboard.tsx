import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@ui/card";
import { PropsWithChildren, useState } from "react";
import PeriodSelect from "./PeriodSelect";

const Dashboard = ({ children }: PropsWithChildren) => {
  const [period, setPeriod] = useState("day/today");

  return (
    <Card className="m-6">
      <CardHeader>
        <CardTitle className="flex justify-between">
          🚀 Dashboard
          <PeriodSelect period={period} setPeriod={setPeriod} />
        </CardTitle>
        <CardDescription>
          Compte-rendu des données pour la période sélectionnée
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row">{children}</CardContent>
    </Card>
  );
};

export default Dashboard;
