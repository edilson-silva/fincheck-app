import { useEffect, useState } from "react";
import { useDashboard } from "../../../../../app/hooks/useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import type { ListTransactionsParams } from "../../../../../app/services/transactions/list";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  const today = new Date();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [filters, setFilters] = useState<ListTransactionsParams>({
    month: today.getMonth(),
    year: today.getFullYear(),
  });

  const { isLoading, isInitialLoading, transactions, refetchTransactions } =
    useTransactions(filters);

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions]);

  const handleOpenFiltersModal = () => {
    setIsFiltersModalOpen(true);
  };

  const handleCloseFiltersModal = () => {
    setIsFiltersModalOpen(false);
  };

  const handleChangeFilter = <TFilter extends keyof ListTransactionsParams>(
    key: TFilter,
    value: ListTransactionsParams[TFilter],
  ) => {
    if (value === filters[key]) return;
    setFilters((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleChangeFilters = <TFilter extends keyof ListTransactionsParams>(
    filters: Record<TFilter, ListTransactionsParams[TFilter]>,
  ) => {
    for (const [k, v] of Object.entries(filters)) {
      handleChangeFilter(k as TFilter, v as ListTransactionsParams[TFilter]);
    }
  };

  return {
    areValuesVisible,
    isInitialLoading,
    isLoading,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    filters,
    handleChangeFilter,
    handleChangeFilters,
  };
}
