import { useState, useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { toast } from "react-toastify";

export function useCurrencyData(initiaCurrencyData) {
  const [currency, setCurrency] = useState(initiaCurrencyData);
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      toast.success(fetcher.data.message);

      if (fetcher?.data?.invoice) {
        setCurrency((prev) => ({ ...prev, ...fetcher.data.currency }));
      }
    } else if (fetcher.data?.error) {
      toast.error(fetcher.data.error);
    }
  }, [fetcher.state, fetcher.data]);

  return {
    currency,
    setCurrency,
    fetcher,
    isLoading: fetcher.state !== "idle",
  };
}
