import type { BankAccount } from "../../entities/bank-account.entity";
import { httpClient } from "../httpClient";

export type ListBankAccountsResponse = BankAccount[];

export async function list(): Promise<ListBankAccountsResponse> {
  const { data } =
    await httpClient.get<ListBankAccountsResponse>("/bank-accounts");

  return data;
}
