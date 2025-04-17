import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrencyData } from "./useCurrencyData";

export function useCurrencyListItem(initialCurrency) {
  const { currency, fetcher, isLoading } = useCurrencyData(initialCurrency);
  const [isEditing, setEditing] = useState(false);
  const navigate = useNavigate();

  const actions = {
    viewDetails: useCallback(
      (e) => {
        e?.stopPropagation();
        navigate(`/settings/currencies/${currency.$id}`);
      },
      [navigate, currency.$id]
    ),

    toggleEdit: useCallback((e) => {
      e?.stopPropagation();
      setEditing((prev) => !prev);
    }, []),

    closeEdit: useCallback(() => {
      setEditing(false);
    }, []),

    deleteCurrency: useCallback(
      (e) => {
        e?.stopPropagation();
        fetcher.submit(null, {
          method: "delete",
          action: `settings/currencies/${currency.$id}/delete`,
        });
      },
      [fetcher, currency.$id]
    ),
  };

  return {
    invoice,
    isEditing,
    isLoading,
    actions,
  };
}
