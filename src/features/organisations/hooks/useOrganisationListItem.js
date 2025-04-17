import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useOrganisationData } from "./useOrganisationData";

export function useOrganisationListItem(initialOrganisation) {
  const { organisation, fetcher, isLoading } =
    useOrganisationData(initialOrganisation);
  const [isEditing, setEditing] = useState(false);
  const navigate = useNavigate();

  const actions = {
    viewDetails: useCallback(
      (e) => {
        e?.stopPropagation();
        navigate(`/settings/organisations/${organisation.$id}`);
      },
      [navigate, organisation.$id]
    ),

    toggleEdit: useCallback((e) => {
      e?.stopPropagation();
      setEditing((prev) => !prev);
    }, []),

    closeEdit: useCallback(() => {
      setEditing(false);
    }, []),

    deleteOrganisation: useCallback(
      (e) => {
        e?.stopPropagation();
        fetcher.submit(null, {
          method: "delete",
          action: `settings/organisations/${organisation.$id}/delete`,
        });
      },
      [fetcher, organisation.$id]
    ),
  };

  return {
    invoice,
    isEditing,
    isLoading,
    actions,
  };
}
