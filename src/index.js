import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import MainState from "./context/MainState";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MainState>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MainState>
  </React.StrictMode>
);
