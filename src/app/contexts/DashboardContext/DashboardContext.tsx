import { createContext } from "react";
import type { BankAccount } from "../../entities/bank-account.entity";
import type { TransactionType } from "./types";

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
  openNewTransactionModal(type: TransactionType): void;
  closeNewTransactionModal(): void;
  newTransactionType: TransactionType | null;
}

export const DashboardContext = createContext({} as DashboardContextValue);
