import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useInvoiceData } from "./useInvoiceData";

export function useInvoiceListItem(initialInvoice) {
  const { invoice, fetcher, isLoading } = useInvoiceData(initialInvoice);
  const [isEditing, setEditing] = useState(false);
  const navigate = useNavigate();

  const actions = {
    viewDetails: useCallback(
      (e) => {
        e?.stopPropagation();
        navigate(`/invoices/${invoice.$id}`);
      },
      [navigate, invoice.$id]
    ),

    toggleEdit: useCallback((e) => {
      e?.stopPropagation();
      setEditing((prev) => !prev);
    }, []),

    closeEdit: useCallback(() => {
      setEditing(false);
    }, []),

    updateStatus: useCallback(
      (newStatus, paymentDate = null) => {
        fetcher.submit(
          { status: newStatus, paymentDate },
          {
            method: "PATCH",
            action: `/invoices/${invoice.$id}/edit-status`,
          }
        );
        setEditing(false);
      },
      [fetcher, invoice.$id]
    ),

    deleteInvoice: useCallback(
      (e) => {
        e?.stopPropagation();
        fetcher.submit(null, {
          method: "delete",
          action: `/invoices/${invoice.$id}/delete`,
        });
      },
      [fetcher, invoice.$id]
    ),
  };

  return {
    invoice,
    isEditing,
    isLoading,
    actions,
  };
}
