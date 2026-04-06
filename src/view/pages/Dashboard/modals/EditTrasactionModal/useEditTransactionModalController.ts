import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import type { Transaction } from "../../../../../app/entities/transaction.entity";
import {
  BankAccountsListKey,
  useBankAccounts,
} from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { TransactionsListKey } from "../../../../../app/hooks/useTransactions";
import { transactionsService } from "../../../../../app/services/transactions";
import { parseCurrency } from "../../../../../app/utils/currency";
import { TransactionCategoryType } from "../../../../../app/utils/types";

const schema = z.object({
  value: z.union([z.string().nonempty("Informe o valor"), z.number()]),
  name: z.string().nonempty("Informe o nome"),
  categoryId: z.string().nonempty("Informe a categoria"),
  bankAccountId: z.string().nonempty("Informe a conta"),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void,
) {
  const [isDeleteTransactionModalOpen, setDeleteTransactionModalOpen] =
    useState(false);

  const { accounts, isLoading: isListBankAccountsLoading } = useBankAccounts();
  const { categories: categoriesList, isLoading: isListCategoriesLoading } =
    useCategories();

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === transaction?.type,
    );
  }, [categoriesList, transaction]);

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: transaction?.value,
      name: transaction?.name,
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      date: transaction ? new Date(transaction?.date) : new Date(),
    },
  });

  const queryClient = useQueryClient();

  const {
    isPending: isEditTransactionLoading,
    mutateAsync: updateTransactionMutateAsync,
  } = useMutation({
    mutationFn: transactionsService.update,
  });

  const {
    isPending: isDeleteTransactionLoading,
    mutateAsync: deleteTransactionMutateAsync,
  } = useMutation({
    mutationFn: transactionsService.remove,
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    const transactionLabel =
      transaction!.type === TransactionCategoryType.EXPENSE
        ? "Despesa"
        : "Receita";

    try {
      await updateTransactionMutateAsync({
        ...data,
        id: transaction!.id,
        value: parseCurrency(data.value),
        type: transaction!.type,
        date: data.date.toISOString(),
      });
      toast.success(
        `${transactionLabel} "${transaction!.name}" editada com sucesso`,
      );
      queryClient.invalidateQueries({ queryKey: [TransactionsListKey] });
      queryClient.invalidateQueries({ queryKey: [BankAccountsListKey] });
      onClose();
    } catch {
      toast.error(
        `Erro ao editar a transação "${transaction!.name}". Tente novamente.`,
      );
    }
  });

  const handleOpenDeleteModal = () => {
    setDeleteTransactionModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteTransactionModalOpen(false);
  };

  const handleDeleteTransaction = async () => {
    try {
      await deleteTransactionMutateAsync(transaction!.id);
      toast.success("Transação deletada com sucesso!");
      queryClient.invalidateQueries({ queryKey: [TransactionsListKey] });
      queryClient.invalidateQueries({ queryKey: [BankAccountsListKey] });
      onClose();
    } catch {
      toast.error("Erro ao deletar a transação. Tente novamente.");
    }
  };

  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    isListBankAccountsLoading,
    categories,
    isListCategoriesLoading,
    isLoading: isEditTransactionLoading || isDeleteTransactionLoading,
    isDeleteTransactionModalOpen,
    handleDeleteTransaction,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  };
}
