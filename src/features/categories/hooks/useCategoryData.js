import { useState, useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { toast } from "react-toastify";

export function useCategoryData(initiaCurrencyData) {
  const [category, setCategory] = useState(initiaCurrencyData);
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      toast.success(fetcher.data.message);

      if (fetcher?.data?.invoice) {
        setCategory((prev) => ({ ...prev, ...fetcher.data.currency }));
      }
    } else if (fetcher.data?.error) {
      toast.error(fetcher.data.error);
    }
  }, [fetcher.state, fetcher.data]);

  return {
    category,
    setCategory,
    fetcher,
    isLoading: fetcher.state !== "idle",
  };
}
