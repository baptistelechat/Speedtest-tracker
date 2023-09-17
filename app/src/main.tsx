import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import PeriodProvider from "./context/Period.context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PeriodProvider>
      <App />
    </PeriodProvider>
  </React.StrictMode>
);
