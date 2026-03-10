import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { Router } from "./Router";
import { AuthContextProvider } from "./app/contexts/AuthContextProvider";
import { queryClient } from "./app/services/queryClient";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Router />
        <Toaster />
      </AuthContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
