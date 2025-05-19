import { useCallback, use } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import { usePartyData } from "./usePartyData";

export function usePartyView() {
  const { party: partyPromise } = useLoaderData();
  const resolvedParty = use(partyPromise);
  const { party, fetcher, isLoading } = usePartyData(resolvedParty);

  const location = useLocation();

  const currentPath = location.pathname;

  const actions = {
    updateParty: useCallback(
      (data) => {
        fetcher.submit(JSON.stringify(data), {
          method: "patch",
          action: `${currentPath}/${party.$id}/edit`,
          encType: "application/json",
        });
      },
      [fetcher, party.$id]
    ),

    deleteParty: useCallback(() => {
      fetcher.submit(null, {
        method: "delete",
        action: `${currentPath}/${party.$id}/delete`,
      });
    }, [fetcher, party.$id]),
  };

  return {
    party,
    isLoading,
    isSubmitting: fetcher.state === "submitting",
    actions,
  };
}
