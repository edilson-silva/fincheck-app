import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import { BankAccountsListKey } from "../../../../../app/hooks/useBankAccounts";
import { useDashboard } from "../../../../../app/hooks/useDashboard";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService";
import { parseCurrency } from "../../../../../app/utils/currency";
import { BankAccountType } from "../../../../../app/utils/types";

const schema = z.object({
  initialBalance: z.union([
    z.string().nonempty("Saldo inicial é obrigatório"),
    z.number(),
  ]),
  name: z.string().nonempty("Nome da conta é obrigatório"),
  type: z.enum(BankAccountType),
  color: z.string().nonempty("Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } =
    useDashboard();
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      color: accountBeingEdited?.color,
      initialBalance: accountBeingEdited?.initialBalance,
    },
  });

  const queryClient = useQueryClient();

  const { isPending: isLoadingUpdate, mutateAsync: updateAccountMutateAsync } =
    useMutation({
      mutationFn: bankAccountsService.update,
    });

  const { isPending: isLoadingDelete, mutateAsync: deleteAccountMutateAsync } =
    useMutation({
      mutationFn: bankAccountsService.remove,
    });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateAccountMutateAsync({
        ...data,
        initialBalance: parseCurrency(data.initialBalance),
        id: accountBeingEdited!.id,
      });
      toast.success("Conta editada com sucesso!");
      queryClient.invalidateQueries({ queryKey: [BankAccountsListKey] });
      closeEditAccountModal();
    } catch {
      toast.error("Erro ao editar conta. Tente novamente.");
    }
  });

  const handleConfirmDeleteModalOpen = () => {
    setIsConfirmDeleteModalOpen(true);
  };

  const handleConfirmDeleteModalClose = () => {
    setIsConfirmDeleteModalOpen(false);
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccountMutateAsync(accountBeingEdited!.id);
      toast.success("Conta deletada com sucesso!");
      queryClient.invalidateQueries({ queryKey: [BankAccountsListKey] });
      closeEditAccountModal();
    } catch {
      toast.error("Erro ao deletar conta. Tente novamente.");
    }
  };

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    accountBeingEdited,
    register,
    errors,
    handleSubmit,
    control,
    isLoading: isLoadingUpdate || isLoadingDelete,
    isConfirmDeleteModalOpen,
    handleConfirmDeleteModalOpen,
    handleConfirmDeleteModalClose,
    handleDeleteAccount,
  };
}
