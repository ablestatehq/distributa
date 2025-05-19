import { useCallback, use } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import { useCategoryData } from "./useCategoryData";

export function useCategoryView() {
  const { category: categoryPromise } = useLoaderData();
  const resolvedCategory = use(categoryPromise);
  const { category, fetcher, isLoading } = useCategoryData(resolvedCategory);

  const location = useLocation();
  const currentPath = location.pathname;

  const actions = {
    updateCategory: useCallback(
      (data) => {
        fetcher.submit(data, {
          method: "patch",
          action: `${currentPath}/${category.$id}/update`,
        });
      },
      [fetcher, category.$id]
    ),
    deleteCategory: useCallback(
      (data) => {
        fetcher.submit(data, {
          method: "delete",
          action: `${currentPath}/${category.$id}/delete`,
        });
      },
      [fetcher, category.$id]
    ),
  };

  return {
    category,
    isLoading,
    actions,
  };
}
