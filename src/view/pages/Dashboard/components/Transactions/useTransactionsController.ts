import { useDashboard } from "../../../../../app/hooks/useDashboard";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  return {
    areValuesVisible,
    isInitialLoading: false,
    isLoading: false,
    transactions: [{}],
  };
}
