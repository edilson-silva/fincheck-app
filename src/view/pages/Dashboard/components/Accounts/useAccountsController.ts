import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useDashboard } from "../../../../../app/hooks/useDashboard";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService";

export const BankAccountsListKey = "bankAccounts:list";

export function useAccountsController() {
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } =
    useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { data: accounts, isFetching: isLoading } = useQuery({
    queryKey: [BankAccountsListKey],
    queryFn: bankAccountsService.list,
  });

  const currentBalance = useMemo(() => {
    if (!accounts) return 0;

    return accounts.reduce(
      (total, account) => total + account.currentBalance,
      0,
    );
  }, [accounts]);

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    accounts: accounts ?? [],
    isLoading,
    currentBalance,
    openNewAccountModal,
  };
}
