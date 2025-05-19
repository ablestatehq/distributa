import { useCallback, use } from "react";
import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import { useInvoiceData } from "./useInvoiceData";

export function useInvoiceView() {
  const { invoice: invoicePromise } = useLoaderData();
  const resolvedInvoice = use(invoicePromise);
  const { invoice, fetcher, isLoading } = useInvoiceData(resolvedInvoice);

  const navigate = useNavigate();
  const location = useLocation();

  const parentPath = location.pathname.split("/")[1];

  const actions = {
    updateDetails: useCallback(
      (data) => {
        fetcher.submit(JSON.stringify(data), {
          method: "patch",
          action: `/${parentPath}/${invoice.$id}/edit`,
          encType: "application/json",
        });
      },
      [fetcher, invoice.$id]
    ),
    updateStatus: useCallback(
      (newStatus, paymentDate = null) => {
        fetcher.submit(
          { status: newStatus, payment_date: paymentDate },
          {
            method: "patch",
            action: `/${parentPath}/${invoice.$id}/edit-status`,
          }
        );
      },
      [fetcher, invoice.$id]
    ),

    deleteInvoice: useCallback(() => {
      fetcher.submit(null, {
        method: "delete",
        action: `/${parentPath}/${invoice.$id}/delete`,
      });
    }, [fetcher, invoice.$id]),

    navigateToEdit: useCallback(() => {
      navigate(`/${parentPath}/${invoice.$id}/edit`);
    }, [navigate, invoice.$id]),

    navigateToView: useCallback(() => {
      navigate(`/${parentPath}/${invoice.$id}`);
    }, [navigate, invoice.$id]),
  };

  return {
    invoice,
    isLoading,
    isSubmitting: fetcher.state === "submitting",
    actions,
  };
}
