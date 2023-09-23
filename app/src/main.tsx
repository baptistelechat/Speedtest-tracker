import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import PeriodProvider from "./context/Period.context.tsx";
import DataProvider from "./context/Data.context.tsx";
import KeyDataProvider from "./context/KeyData.context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PeriodProvider>
      <DataProvider>
        <KeyDataProvider>
          <App />
        </KeyDataProvider>
      </DataProvider>
    </PeriodProvider>
  </React.StrictMode>
);
