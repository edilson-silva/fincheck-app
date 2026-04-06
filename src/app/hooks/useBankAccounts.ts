import { useQuery } from "@tanstack/react-query";
import { bankAccountsService } from "../services/bankAccountsService";

export const BankAccountsListKey = "bankAccounts:list";

export function useBankAccounts() {
  const { data: accounts, isFetching: isLoading } = useQuery({
    queryKey: [BankAccountsListKey],
    queryFn: bankAccountsService.list,
    staleTime: Infinity,
  });

  return {
    accounts: accounts ?? [],
    isLoading,
  };
}
