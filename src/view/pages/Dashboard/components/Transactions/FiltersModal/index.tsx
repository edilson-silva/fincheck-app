import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import type { ListTransactionsParams } from "../../../../../../app/services/transactions/list";
import { cn } from "../../../../../../app/utils/cn";
import { Button } from "../../../../../components/Button";
import { Modal } from "../../../../../components/Modal";
import { useFilterModalController } from "./useFilterModalController";

interface FiltersModalProps {
  open: boolean;
  onClose(): void;
  onApplyFilters<TFilter extends keyof ListTransactionsParams>(
    filters: Record<TFilter, ListTransactionsParams[TFilter]>,
  ): void;
}

export function FiltersModal({
  open,
  onClose,
  onApplyFilters,
}: FiltersModalProps) {
  const {
    handleSelectBankAccountId,
    selectedBankAccountId,
    selectedYear,
    handleDecreaseYear,
    handleIncreaseYear,
    accounts,
  } = useFilterModalController();

  return (
    <Modal open={open} onClose={onClose} title="Filtros">
      <div>
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">
          Conta
        </span>
        <div className="space-y-2 mt-2">
          {accounts.map((bankAccount) => (
            <button
              className={cn(
                "w-full text-left p-2 rounded-2xl text-gray-800 hover:bg-gray-50 transition-colors",
                bankAccount.id === selectedBankAccountId && "!bg-gray-200",
              )}
              key={bankAccount.id}
              onClick={() => handleSelectBankAccountId(bankAccount.id)}
            >
              {bankAccount.name}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-10 text-gray-800">
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">
          Ano
        </span>
        <div className="mt-2 w-52 flex items-center justify-between">
          <button
            className="w-12 h-12 flex items-center justify-center"
            onClick={handleDecreaseYear}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <div className="flex-1 text-center">
            <span className="text-sm font-medium tracking-[-0.5px]">
              {selectedYear}
            </span>
          </div>
          <button
            className="w-12 h-12 flex items-center justify-center"
            onClick={handleIncreaseYear}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
        <Button
          className="w-full mt-10"
          onClick={() => {
            onApplyFilters({
              bankAccountId: selectedBankAccountId,
              year: selectedYear,
            });
            onClose();
          }}
        >
          Aplicar Filtros
        </Button>
      </div>
    </Modal>
  );
}
