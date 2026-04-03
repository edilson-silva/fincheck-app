import type { BankAccount } from "../../../../../app/entities/bank-account.entity";
import { useDashboard } from "../../../../../app/hooks/useDashboard";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrencty } from "../../../../../app/utils/currency";
import { BankAccountTypeIcon } from "../../../../../assets/icons/BankAccountTypeIcon";

interface AccountCardProps {
  bankAccount: BankAccount;
}

export function AccountCard({ bankAccount }: AccountCardProps) {
  const { name, type, currentBalance, color } = bankAccount;
  const { areValuesVisible, openEditAccountModal } = useDashboard();

  return (
    <div
      className="bg-white p-4 rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-teal-950"
      style={{ borderColor: color }}
      role="button"
      onClick={() => openEditAccountModal(bankAccount)}
    >
      <div>
        <BankAccountTypeIcon type={type} />
        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
          {name}
        </span>
      </div>
      <div>
        <span
          className={cn(
            "text-gray-800 font-medium tracking-[-0.5px] block",
            !areValuesVisible && "blur-sm",
          )}
        >
          {formatCurrencty(currentBalance)}
        </span>
        <small className="text-gray-600 text-sm">Saldo atual</small>
      </div>
    </div>
  );
}
