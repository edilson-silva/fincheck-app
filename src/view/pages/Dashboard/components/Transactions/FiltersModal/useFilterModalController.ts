import { useState } from "react";
import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";

export function useFilterModalController() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<
    string | undefined
  >(undefined);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { accounts } = useBankAccounts();

  const handleSelectBankAccountId = (bankAccountId: string) => {
    setSelectedBankAccountId((prevState) =>
      prevState === bankAccountId ? undefined : bankAccountId,
    );
  };

  const handleDecreaseYear = () => {
    setSelectedYear((prevState) => prevState - 1);
  };

  const handleIncreaseYear = () => {
    setSelectedYear((prevState) => prevState + 1);
  };

  return {
    selectedBankAccountId,
    handleSelectBankAccountId,
    selectedYear,
    handleDecreaseYear,
    handleIncreaseYear,
    accounts,
  };
}
