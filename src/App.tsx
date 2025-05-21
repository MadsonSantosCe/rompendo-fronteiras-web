import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./components/theme-provider";
import { Router } from "./routes/Router";
import { env } from "./config/env";
import { ModeToggle } from "./components/mode-toggle";
import { queryClient } from "./utils/tanStack/queryClient";
import { AuthProvider } from "./contexts/auth/authProvider";

const node_env = env.VITE_NODE_ENV;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Router />
          <ModeToggle />
        </ThemeProvider>
      </AuthProvider>
      {node_env === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default App;
