import { useState, useEffect, useMemo } from "react";
import { useFetcher } from "react-router-dom";
import { toast } from "react-toastify";

export function useCategories() {
  const [categories, setCategories] = useState({ documents: [], total: 0 });
  const [resolving, setResolving] = useState(false);
  const categoriesFetcher = useFetcher();

  useEffect(() => {
    if (categoriesFetcher.state === "idle" && !categoriesFetcher.data) {
      categoriesFetcher.load("/settings/categories");
    }
  }, []);

  useEffect(() => {
    handleCategoryData();
  }, [categoriesFetcher.state, categoriesFetcher.data]);

  const handleCategoryData = async () => {
    if (
      categoriesFetcher.state === "idle" &&
      categoriesFetcher.data &&
      !categoriesFetcher.data.error
    ) {
      try {
        setResolving(true);
        const categories = await categoriesFetcher.data.categoryList;
        setCategories((prev) => ({ ...prev, ...categories }));
      } catch (error) {
        toast.error(error.message || "Failed to load categories");
      } finally {
        setResolving(false);
      }
    } else if (
      categoriesFetcher.state === "idle" &&
      categoriesFetcher.data?.error
    ) {
      toast.error(
        categoriesFetcher.data.message || "Failed to load categoriess"
      );
    }
  };

  const isLoading = useMemo(
    () => categoriesFetcher.state === "loading" || resolving,
    [categoriesFetcher.state, resolving]
  );

  const refreshCategories = useMemo(
    () => () => categoriesFetcher.load("/settings/categories"),
    [categoriesFetcher]
  );

  // Function to search categories
  const searchCategories = async (searchTerm) => {
    try {
      // Assuming there's an API endpoint for searching categories
      const response = await categoriesFetcher.load(
        `/settings/categories?search=${searchTerm}`
      );

      // If the API doesn't support search, we can filter locally
      if (!response) {
        const filteredCategories = categories.documents.filter((category) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return filteredCategories;
      }

      return response.categoryList.documents || [];
    } catch (error) {
      console.error("Error searching categories:", error);
      toast.error("Failed to search categories");
      return [];
    }
  };

  return {
    categories,
    isLoading,
    refreshCategories,
    searchCategories, 
  };
}
