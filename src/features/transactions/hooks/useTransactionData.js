import { useState, useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { toast } from "react-toastify";

export function useTransactionData(initialTransactionData) {
  const [transaction, setTransaction] = useState(initialTransactionData);
  const fetcher = useFetcher();

  useEffect(() => {
    if (
      (fetcher.state === "idle" || fetcher.state == "loading") &&
      fetcher.data?.success
    ) {
      toast.success(fetcher.data.message);

      if (fetcher?.data?.invoice) {
        setInvoice((prev) => ({ ...prev, ...fetcher.data.invoice }));
      }
    } else if (
      (fetcher.state === "idle" || fetcher.state == "loading") &&
      fetcher.data?.error
    ) {
      toast.error(fetcher.data.error);
    }
  }, [fetcher.state, fetcher.data]);

  return {
    transaction,
    setTransaction,
    fetcher,
    isLoading: fetcher.state !== "idle",
  };
}
