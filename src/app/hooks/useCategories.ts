import { useQuery } from "@tanstack/react-query";
import { categoriesService } from "../services/categoriesService";

export const CategoriesListKey = "categories:list";

export function useCategories() {
  const { data: categories, isFetching: isLoading } = useQuery({
    queryKey: [CategoriesListKey],
    queryFn: categoriesService.list,
  });

  return {
    categories: categories ?? [],
    isLoading,
  };
}
