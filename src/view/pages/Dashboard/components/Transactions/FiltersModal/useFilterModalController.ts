import { useState } from "react";

export function useFilterModalController() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<
    string | null
  >(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleSelectBankAccountId = (bankAccountId: string) => {
    setSelectedBankAccountId((prevState) =>
      prevState === bankAccountId ? null : bankAccountId,
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
  };
}
