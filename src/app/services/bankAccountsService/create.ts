import type { BankAccountType } from "../../utils/types";
import { httpClient } from "../httpClient";

export interface CreateBankAccountParams {
  name: string;
  initialBalance: number;
  type: BankAccountType;
  color: string;
}

export async function create(params: CreateBankAccountParams): Promise<void> {
  const { data } = await httpClient.post("/bank-accounts", params);

  return data;
}
