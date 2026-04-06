import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import {
  BankAccountsListKey,
  useBankAccounts,
} from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useDashboard } from "../../../../../app/hooks/useDashboard";
import { TransactionsListKey } from "../../../../../app/hooks/useTransactions";
import { transactionsService } from "../../../../../app/services/transactions";
import { parseCurrency } from "../../../../../app/utils/currency";
import { TransactionCategoryType } from "../../../../../app/utils/types";

const schema = z.object({
  value: z.string().nonempty("Informe o valor"),
  name: z.string().nonempty("Informe o nome"),
  categoryId: z.string().nonempty("Informe a categoria"),
  bankAccountId: z.string().nonempty("Informe a conta"),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal: handleCloseNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  const { accounts, isLoading: isListBankAccountsLoading } = useBankAccounts();
  const { categories: categoriesList, isLoading: isListCategoriesLoading } =
    useCategories();

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === newTransactionType,
    );
  }, [categoriesList, newTransactionType]);

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isPending: isCreateTransactionLoading, mutateAsync } = useMutation({
    mutationFn: transactionsService.create,
  });

  const closeNewTransactionModal = () => {
    handleCloseNewTransactionModal();
    reset();
  };

  const queryClient = useQueryClient();

  const handleSubmit = hookFormSubmit(async (data) => {
    const transactionLabel =
      newTransactionType === TransactionCategoryType.EXPENSE
        ? "Despesa"
        : "Receita";

    try {
      await mutateAsync({
        ...data,
        value: parseCurrency(data.value),
        type: newTransactionType!,
        date: data.date.toISOString(),
      });
      toast.success(`${transactionLabel} cadastrada com sucesso`);
      queryClient.invalidateQueries({ queryKey: [TransactionsListKey] });
      queryClient.invalidateQueries({ queryKey: [BankAccountsListKey] });
      closeNewTransactionModal();
      reset();
    } catch {
      toast.error(
        `Erro ao cadastrar a ${transactionLabel.toLowerCase()}. Tente novamente.`,
      );
    }
  });

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    isListBankAccountsLoading,
    categories,
    isListCategoriesLoading,
    isCreateTransactionLoading,
  };
}
