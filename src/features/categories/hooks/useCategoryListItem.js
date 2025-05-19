import { useState, useCallback } from "react";
import { useCategoryData } from "./useCategoryData";
import { useLocation } from "react-router-dom";

export function useCategoryListItem(initialcategory) {
  const { category, fetcher, isLoading } = useCategoryData(initialcategory);

  const [isEditing, setEditing] = useState(false);
  const [isViewing, setViewing] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;

  const actions = {
    toggleView: useCallback((e) => {
      e?.stopPropagation();
      setViewing((prev) => !prev);
    }, []),

    toggleEdit: useCallback((e) => {
      e?.stopPropagation();
      setEditing((prev) => !prev);
    }, []),

    closeEdit: useCallback(() => {
      setEditing(false);
    }, []),

    deleteCategory: useCallback(
      (e) => {
        e?.stopPropagation();
        fetcher.submit(null, {
          method: "delete",
          action: `${currentPath}/${category.$id}/delete`,
        });
      },
      [fetcher, category.$id]
    ),
  };

  return {
    category,
    isViewing,
    isEditing,
    isLoading,
    actions,
  };
}
