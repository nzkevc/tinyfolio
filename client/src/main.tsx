import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/styles/globals.css";

import { BrowserRouter } from "react-router";

import App from "./App.tsx";
import { ThemeProvider } from "./components/theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
