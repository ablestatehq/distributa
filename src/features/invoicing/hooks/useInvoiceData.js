import { useState, useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { toast } from "react-toastify";

export function useInvoiceData(initialInvoiceData) {
  const [invoice, setInvoice] = useState(initialInvoiceData);
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      toast.success(fetcher.data.message);

      //   if (fetcher?.data?.invoice && fetcher.data.invoice?.$id === invoice.$id) {
      //     setInvoice((prev) => ({ ...prev, ...invoice.data.invoice }));
      //   }

      if (fetcher?.data?.invoice) {
        setInvoice((prev) => ({ ...prev, ...fetcher.data.invoice }));
      }
    } else if (fetcher.data?.error) {
      toast.error(fetcher.data.error);
    }
  }, [fetcher.state, fetcher.data]);

  return {
    invoice,
    setInvoice,
    fetcher,
    isLoading: fetcher.state !== "idle",
  };
}
