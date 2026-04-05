import type { TransactionCategoryType } from "../utils/types";

export class TransactionCategory {
  constructor(
    public id: string,
    public name: string,
    public icon: string,
  ) {}
}

export class Transaction {
  constructor(
    public id: string,
    public userId: string,
    public bankAccountId: string,
    public categoryId: string,
    public name: string,
    public value: number,
    public date: string,
    public type: TransactionCategoryType,
    public category?: TransactionCategory,
  ) {}
}
