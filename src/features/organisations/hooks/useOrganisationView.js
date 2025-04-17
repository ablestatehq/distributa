import { useCallback, use } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useOrganisationData } from "./useOrganisationData";

export function useOrganisationView() {
  const { organisation: organisationPromise } = useLoaderData();
  const resolvedOrganisation = use(organisationPromise);
  const { organisation, fetcher, isLoading } =
    useOrganisationData(resolvedOrganisation);

  const navigate = useNavigate();

  const actions = {
    updateDetails: useCallback(
      (data) => {
        fetcher.submit(data, {
          method: "patch",
          action: `/settings/organisations/${organisation.$id}/edit`,
        });
      },
      [fetcher, organisation.$id]
    ),
    deleteOrganisation: useCallback(() => {
      fetcher.submit(null, {
        method: "delete",
        action: `/settings/organisations/${organisation.$id}/delete`,
      });
    }, [fetcher, organisation.$id]),

    navigateToEdit: useCallback(() => {
      navigate(`/settings/organisations/${organisation.$id}/edit`);
    }, [navigate, organisation.$id]),

    navigateToView: useCallback(() => {
      navigate(`/settings/organisations/${organisation.$id}`);
    }, [navigate, organisation.$id]),

    navigateToCreate: useCallback(() => {
      navigate("/settings/organisations/new");
    }, [navigate]),
  };

  return {
    organisation,
    isLoading,
    actions,
  };
}
