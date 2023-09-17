import Dashboard from "./components/Dashboard";
import KeyDataContainer from "./components/KeyData/KeyDataContainer";
import SpeedTestDataTableContainer from "./components/SpeedTestDataTable/SpeedTestDataTableContainer";
import SpeedTestGraph from "./components/SpeedTestGraph";

const App = () => {
  return (
    <Dashboard>
      <div id="DashboardContent" className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-row gap-4">
          <SpeedTestGraph />
          <KeyDataContainer />
        </div>
        <SpeedTestDataTableContainer/>
      </div>
    </Dashboard>
  );
};

export default App;
