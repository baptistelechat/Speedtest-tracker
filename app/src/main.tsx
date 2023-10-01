import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import PeriodProvider from "./context/Period.context.tsx";
import DataProvider from "./context/Data.context.tsx";
import KeyDataProvider from "./context/KeyData.context.tsx";
import { ThemeProvider } from "./components/theme/theme-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <PeriodProvider>
        <DataProvider>
          <KeyDataProvider>
            <App />
            <Toaster />
          </KeyDataProvider>
        </DataProvider>
      </PeriodProvider>
    </ThemeProvider>
  </React.StrictMode>
);
