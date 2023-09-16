import { Card, CardHeader, CardTitle, CardContent } from "@ui/card";
import SpeedTestDataTable from "./SpeedTestDataTable";

const SpeedTestDataTableContainer = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>SpeedTest Table</CardTitle>
      </CardHeader>
      <CardContent>
        <SpeedTestDataTable />
      </CardContent>
    </Card>
  );
};

export default SpeedTestDataTableContainer;
