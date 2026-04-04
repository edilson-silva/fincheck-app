import { httpClient } from "../httpClient";

export async function remove(bankAccountId: string): Promise<void> {
  return await httpClient.delete(`/bank-accounts/${bankAccountId}`);
}
