import { useCallback, use } from "react";
import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import { useTransactionData } from "./useTransactionData";

export function useTransactionView() {
  const { transaction: transactionPromise } = useLoaderData();
  const resolvedTransaction = use(transactionPromise);
  const { transaction, fetcher, isLoading } =
    useTransactionData(resolvedTransaction);

  const navigate = useNavigate();
  const location = useLocation();

  const parentPath = location.pathname.split("/")[1];

  const actions = {
    updateDetails: useCallback(
      (data) => {
        fetcher.submit(JSON.stringify(data), {
          method: "patch",
          action: `/${parentPath}/${transaction.$id}/edit`,
          encType: "application/json",
        });
      },
      [fetcher, transaction.$id]
    ),

    deleteInvoice: useCallback(() => {
      fetcher.submit(null, {
        method: "delete",
        action: `/${parentPath}/${transaction.$id}/delete`,
      });
    }, [fetcher, transaction.$id]),

    navigateToEdit: useCallback(() => {
      navigate(`/${parentPath}/${transaction.$id}/edit`);
    }, [navigate, transaction.$id]),

    navigateToView: useCallback(() => {
      navigate(`/${parentPath}/${invoice.$id}`);
    }, [navigate, transaction.$id]),
  };

  return {
    transaction,
    isLoading,
    isSubmitting: fetcher.state === "submitting",
    actions,
  };
}
