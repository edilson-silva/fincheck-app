import type { Category } from "../../entities/category.entity";
import { httpClient } from "../httpClient";

export type ListCategoriesResponse = Category[];

export async function list(): Promise<ListCategoriesResponse> {
  const { data } = await httpClient.get<ListCategoriesResponse>("/categories");

  return data;
}
