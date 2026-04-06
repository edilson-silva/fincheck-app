import type { TransactionCategoryType } from "../../utils/types";
import { httpClient } from "../httpClient";

export interface EditTransactionParams {
  id: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
  type: TransactionCategoryType;
}

export async function update({
  id,
  ...params
}: EditTransactionParams): Promise<void> {
  return await httpClient.put(`/transactions/${id}`, params);
}
