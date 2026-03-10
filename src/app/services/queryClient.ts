import { QueryClient } from "@tanstack/react-query";
import { getMinutesInMilliseconds } from "../utils/time";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: getMinutesInMilliseconds(5),
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});
