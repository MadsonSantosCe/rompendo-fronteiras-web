import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { env } from "./config/env.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { ModeToggle } from "./components/mode-toggle.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const node_env = env.VITE_NODE_ENV;
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

          <App />
          <ModeToggle />

        </ThemeProvider>

      {node_env === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}

    </QueryClientProvider>
    <Toaster position="top-right" />
  </StrictMode>
);
