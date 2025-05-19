import { useMemo } from "react";
import { useTransactionSubmission } from "./useTransactionSubmission";

export function useCreateTransaction() {
  const { submitTransaction, isLoading: isSubmitting } =
    useTransactionSubmission();

  const actions = useMemo(
    () => ({
      createTransaction: submitTransaction,
      refreshCategories,
      refreshParties,
    }),
    [submitTransaction, refreshCategories, refreshParties]
  );

  return {
    isSubmitting,
    actions,
  };
}
