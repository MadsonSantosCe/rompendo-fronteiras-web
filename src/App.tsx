import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Router } from "./routes/Router";
import { queryClient } from "./lib/TanStack/queryClient";
import { env } from "./config/env";

const node_env = env.VITE_NODE_ENV;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />

      {node_env === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default App;
