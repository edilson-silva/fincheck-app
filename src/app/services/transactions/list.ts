import type { Transaction } from "../../entities/transaction.entity";
import type { TransactionCategoryType } from "../../utils/types";
import { httpClient } from "../httpClient";

export interface ListTransactionsParams {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: TransactionCategoryType;
}
export type ListTransactionsResponse = Transaction[];

export async function list(
  params: ListTransactionsParams,
): Promise<ListTransactionsResponse> {
  const { data } = await httpClient.get<ListTransactionsResponse>(
    "/transactions",
    { params },
  );

  return data;
}
