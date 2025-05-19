import { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { usePartyData } from "./usePartyData";

export function usePartyListItem(initialParty) {
  const { party, fetcher, isLoading } = usePartyData(initialParty);

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

    deleteParty: useCallback(
      (e) => {
        e?.stopPropagation();
        fetcher.submit(null, {
          method: "delete",
          action: `${currentPath}/${party.$id}/delete`,
        });
      },
      [fetcher, party.$id]
    ),
  };

  return {
    party,
    isEditing,
    isViewing,
    isLoading,
    actions,
  };
}
