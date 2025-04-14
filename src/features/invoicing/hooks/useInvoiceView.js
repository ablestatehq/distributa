import { useCallback, use } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useInvoiceData } from "./useInvoiceData";

export function useInvoiceView() {
  const { invoice: invoicePromise } = useLoaderData();
  const resolvedInvoice = use(invoicePromise);
  const { invoice, fetcher, isLoading } = useInvoiceData(resolvedInvoice);

  const navigate = useNavigate();

  const actions = {
    updateDetails: useCallback(
      (data) => {
        fetcher.submit(data, {
          method: "patch",
          action: `/invoices/${invoice.$id}/edit`,
        });
      },
      [fetcher, invoice.$id]
    ),
    updateStatus: useCallback(
      (newStatus, paymentDate = null) => {
        fetcher.submit(
          { status: newStatus, payment_date: paymentDate },
          {
            method: "post",
            action: `/invoices/${invoice.$id}/edit-status`,
          }
        );
      },
      [fetcher, invoice.$id]
    ),

    deleteInvoice: useCallback(() => {
      fetcher.submit(null, {
        method: "delete",
        action: `/invoices/${invoice.$id}/delete`,
      });
    }, [fetcher, invoice.$id]),

    navigateToEdit: useCallback(() => {
      navigate(`/invoices/${invoice.$id}/edit`);
    }, [navigate, invoice.$id]),

    navigateToView: useCallback(() => {
      navigate(`/invoices/${invoice.$id}`);
    }, [navigate, invoice.$id]),
  };

  return {
    invoice,
    isLoading,
    actions,
  };
}
