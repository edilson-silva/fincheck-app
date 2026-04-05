import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionCategoryType } from "../../../../../app/utils/types";
import { ExpensesIcon } from "../../../../../assets/icons/ExpensesIcon";
import { IncomeIcon } from "../../../../../assets/icons/IncomeIcon";
import { TransactionsIcon } from "../../../../../assets/icons/TransactionsIcon";
import { DropdownMenu } from "../../../../components/DropdownMenu";

type TransactionTypeOptional = TransactionCategoryType | undefined;

interface TransactionsMenuProps {
  onSelect(type: TransactionTypeOptional): void;
  selectedType: TransactionTypeOptional;
}

export function TransactionsMenu({
  onSelect,
  selectedType,
}: TransactionsMenuProps) {
  const transactionsTypes: TransactionTypeOptional[] = [
    TransactionCategoryType.INCOME,
    TransactionCategoryType.EXPENSE,
    undefined,
  ];
  const getLabel = (transactionType: TransactionTypeOptional) => {
    switch (transactionType) {
      case TransactionCategoryType.INCOME:
        return "Receitas";
      case TransactionCategoryType.EXPENSE:
        return "Despesas";
      default:
        return "Transações";
    }
  };
  const getIcon = (transactionType: TransactionTypeOptional) => {
    switch (transactionType) {
      case TransactionCategoryType.INCOME:
        return <IncomeIcon />;
      case TransactionCategoryType.EXPENSE:
        return <ExpensesIcon />;
      default:
        return <TransactionsIcon />;
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="flex items-center gap-2">
          {getIcon(selectedType)}
          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
            {getLabel(selectedType)}
          </span>
          <ChevronDownIcon className="text-gray-900" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-[279px]">
        {transactionsTypes.map((transactionType) => (
          <DropdownMenu.Item
            key={`${getLabel(selectedType)}`}
            className="gap-2"
            onSelect={() => onSelect(transactionType)}
          >
            <IncomeIcon />
            {getLabel(transactionType)}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
