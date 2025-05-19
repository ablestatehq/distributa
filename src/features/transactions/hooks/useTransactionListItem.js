import { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useTransactionData } from "./useTransactionData";

export function useTransactionListItem(initialTransaction) {
  const { transaction, fetcher, isLoading } =
    useTransactionData(initialTransaction);

  const [isEditing, setEditing] = useState(false);
  const [isViewing, setViewing] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;

  const actions = {
    toggleView: useCallback(
      (e) => {
        e?.stopPropagation();
        setViewing(!isViewing);
      },
      [isViewing]
    ),

    toggleEdit: useCallback(
      (e) => {
        e?.stopPropagation();
        setEditing(!isEditing);
      },
      [isEditing]
    ),

    deleteTransaction: useCallback(
      (e) => {
        e?.stopPropagation();
        fetcher.submit(null, {
          method: "delete",
          action: `${currentPath}/${transaction.$id}/delete`,
        });
      },
      [fetcher, transaction.$id]
    ),
  };

  return {
    transaction,
    isEditing,
    isViewing,
    isLoading,
    actions,
  };
}
