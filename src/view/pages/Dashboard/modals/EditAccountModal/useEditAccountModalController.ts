import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import { useDashboard } from "../../../../../app/hooks/useDashboard";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService";
import { parseCurrency } from "../../../../../app/utils/currency";
import { BankAccountType } from "../../../../../app/utils/types";
import { BankAccountsListKey } from "../../components/Accounts/useAccountsController";

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

export function useNewAccountModalController() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } =
    useDashboard();

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

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationFn: bankAccountsService.update,
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
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

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
  };
}
