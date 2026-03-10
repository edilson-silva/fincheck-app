import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Router } from "./Router";
import { AuthContextProvider } from "./app/contexts/AuthContextProvider";
import { getMinutesInMilliseconds } from "./app/utils/time";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: getMinutesInMilliseconds(5),
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Router />
        <Toaster />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
