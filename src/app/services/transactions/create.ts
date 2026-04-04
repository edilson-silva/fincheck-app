import type { TransactionCategoryType } from "../../utils/types";
import { httpClient } from "../httpClient";

export interface CreateTransactionParams {
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
  type: TransactionCategoryType;
}

export async function create(params: CreateTransactionParams): Promise<void> {
  const { data } = await httpClient.post("/transactions", params);

  return data;
}
