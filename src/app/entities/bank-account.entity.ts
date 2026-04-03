import type { BankAccountType } from "../utils/types";

export class BankAccount {
  constructor(
    public id: string,
    public name: string,
    public userId: string,
    public initialBalance: number,
    public type: BankAccountType,
    public color: string,
    public currentBalance: number,
  ) {}
}
