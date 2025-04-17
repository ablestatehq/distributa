import { useCallback, use } from "react";
import { useLoaderData } from "react-router-dom";
import { useCurrencyData } from "./useCurrencyData";

export function useCurrencyView() {
  const { currency: currencyPromise } = useLoaderData();
  const resolvedCurrency = use(currencyPromise);
  const { currency, fetcher, isLoading } = useCurrencyData(resolvedCurrency);

  const actions = {
    updateCurrencies: useCallback(
      (data) => {
        fetcher.submit(data, {
          method: "patch",
          action: `/settings/currencies/update`,
        });
      },
      [fetcher, currency.$id]
    ),
  };

  return {
    currency,
    isLoading,
    actions,
  };
}
