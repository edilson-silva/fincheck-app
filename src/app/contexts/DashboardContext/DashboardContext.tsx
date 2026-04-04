import { createContext } from "react";
import type { BankAccount } from "../../entities/bank-account.entity";
import type { TransactionCategoryType } from "../../utils/types";

interface DashboardContextValue {
  areValuesVisible: boolean;
  toggleValuesVisibility(): void;
  isNewAccountModalOpen: boolean;
  openNewAccountModal(): void;
  closeNewAccountModal(): void;
  isEditAccountModalOpen: boolean;
  accountBeingEdited: BankAccount | null;
  openEditAccountModal(bankAccount: BankAccount): void;
  closeEditAccountModal(): void;
  isNewTransactionModalOpen: boolean;
  openNewTransactionModal(type: TransactionCategoryType): void;
  closeNewTransactionModal(): void;
  newTransactionType: TransactionCategoryType | null;
}

export const DashboardContext = createContext({} as DashboardContextValue);
