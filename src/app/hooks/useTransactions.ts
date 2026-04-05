import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "../services/transactions";
import type { ListTransactionsParams } from "../services/transactions/list";

export const TransactionsListKey = "transactions:list";

export function useTransactions(filters: ListTransactionsParams) {
  const {
    data: transactions,
    isFetching: isLoading,
    isLoading: isInitialLoading,
    refetch: refetchTransactions,
  } = useQuery({
    queryKey: [TransactionsListKey],
    queryFn: () => transactionsService.list(filters),
  });

  return {
    transactions: transactions ?? [],
    isLoading,
    isInitialLoading,
    refetchTransactions,
  };
}
