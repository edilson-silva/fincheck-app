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
  initialBalance: z.string().nonempty("Saldo inicial é obrigatório"),
  name: z.string().nonempty("Nome da conta é obrigatório"),
  type: z.enum(BankAccountType),
  color: z.string().nonempty("Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationFn: bankAccountsService.create,
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: parseCurrency(data.initialBalance),
      });
      toast.success("Conta criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: [BankAccountsListKey] });
      closeNewAccountModal();
      reset();
    } catch {
      toast.error("Erro ao criar conta. Tente novamente.");
    }
  });

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
  };
}
