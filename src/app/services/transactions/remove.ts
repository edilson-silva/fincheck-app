import { httpClient } from "../httpClient";

export async function remove(transactionId: string): Promise<void> {
  return await httpClient.delete(`/transactions/${transactionId}`);
}
