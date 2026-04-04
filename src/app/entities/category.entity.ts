import type { CategoryType } from "../utils/types";

export class Category {
  constructor(
    public id: string,
    public userId: string,
    public name: string,
    public icon: string,
    public type: CategoryType,
  ) {}
}
