import { TransactionType } from "../../../../../app/contexts/DashboardContext/types";
import { Button } from "../../../../components/Button";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewTransactionModalController } from "./useNewTransactionModalController";

export function NewTransactionModal() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === TransactionType.EXPENSE;
  const transactionLabel = isExpense ? "Despesa" : "Receita";

  return (
    <Modal
      title={`Nova ${transactionLabel}`}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form action="">
        <div className="flex flex-col">
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Valor da {transactionLabel}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <InputCurrency />
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            name="name"
            placeholder={`Nome da ${transactionLabel}`}
          />
          <Select
            placeholder="Categoria"
            error="Você deve escolher uma categoria"
            options={[
              { value: "CHECKING", label: "Conta Corrente" },
              { value: "INVESTMENT", label: "Investimentos" },
              { value: "CASH", label: "Dinheiro Físico" },
            ]}
          />
          <Select
            placeholder={isExpense ? "Pagar com" : "Receber com"}
            error="Você deve escolher uma categoria"
            options={[
              { value: "NUBANK", label: "Nubank" },
              { value: "XP", label: "XP Investimentos" },
            ]}
          />
          <DatePickerInput error="Você deve selecionar uma data" />
          <Button className="w-full mt-10">Salvar</Button>
        </div>
      </form>
    </Modal>
  );
}
