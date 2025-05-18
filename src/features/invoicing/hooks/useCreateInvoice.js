import { useOrganisationView } from "../../organisations/hooks";
import { useCurrencies } from "../../currencies/hooks/useCurrencies";
import { useCallback } from "react";
import { useFetcher, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const parentPath = location.pathname.split("/")[1];

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      toast.success(fetcher.data.message);
      navigate(
        `/${parentPath}?page=${DEFAULT_PAGE}&pageSize=${DEFAULT_PAGE_SIZE}`
      );
    } else if (fetcher.state === "idle" && fetcher.data?.error) {
      toast.error(fetcher.data.message);
    }
  }, [fetcher?.state, fetcher?.data, navigate]);

  const actions = {
    createInvoice: useCallback(
      (data) => {
        fetcher.submit(JSON.stringify(data), {
          method: "post",
          action: `/${parentPath}/new`,
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
