import { useOrganisationView } from "../../organisations/hooks";
import { useCurrencies } from "../../currencies/hooks/useCurrencies";
import { useCallback } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "../../../data/constants/pagination";
import { toast } from "react-toastify";
import { useInvoices } from "./useInvoices";

export function useCreateInvoice() {
  const { organisation } = useOrganisationView();
  const { currencies: availableCurrencies } = useCurrencies();
  const { total } = useInvoices();

  const fetcher = useFetcher();
  const navigate = useNavigate();

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      toast.success(fetcher.data.message);
      navigate(`/sales-invoices?page=${DEFAULT_PAGE}&pageSize=${DEFAULT_PAGE_SIZE}`);
    } else if (fetcher.state === "idle" && fetcher.data?.error) {
      toast.error(fetcher.data.error);
      navigate(`/sales-invoices?page=${DEFAULT_PAGE}&pageSize=${DEFAULT_PAGE_SIZE}`);
    }
  }, [fetcher?.state, fetcher?.data, navigate]);

  const actions = {
    createInvoice: useCallback(
      (data) => {
        fetcher.submit(JSON.stringify(data), {
          method: "post",
          action: "/sales-invoices/new",
          encType: "application/json",
        });
      },
      [fetcher, organisation]
    ),
  };

  return {
    invoiceNumber: `INV-${total + 1}`,
    organisation,
    availableCurrencies,
    isLoading: fetcher.state === "submitting",
    actions,
  };
}
