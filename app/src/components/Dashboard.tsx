import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@ui/card";
import { PropsWithChildren } from "react";

const Dashboard = ({ children }: PropsWithChildren) => {
  return (
    <Card className="m-6">
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>
          Compte-rendu des données pour la période sélectionnée
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row">{children}</CardContent>
    </Card>
  );
};

export default Dashboard;
