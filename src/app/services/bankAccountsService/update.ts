import { BankAccount } from "../../entities/bank-account.entity";
import type { BankAccountType } from "../../utils/types";
import { httpClient } from "../httpClient";

export interface UpdateBankAccountParams {
  id: string;
  name: string;
  initialBalance: number;
  type: BankAccountType;
  color: string;
}

export async function update({
  id,
  ...params
}: UpdateBankAccountParams): Promise<BankAccount> {
  const { data } = await httpClient.put<BankAccount>(
    `/bank-accounts/${id}`,
    params,
  );

  return data;
}
