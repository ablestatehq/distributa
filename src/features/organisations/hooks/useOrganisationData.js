import { useState, useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { toast } from "react-toastify";

export function useOrganisationData(initialOrganisationData) {
  const [organisation, setOrganisation] = useState(initialOrganisationData);
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      toast.success(fetcher.data.message);

      if (fetcher?.data?.organisation) {
        setOrganisation((prev) => ({ ...prev, ...fetcher.data.organisation }));
      }
    } else if (fetcher.data?.error) {
      toast.error(fetcher.data.error);
    }
  }, [fetcher.state, fetcher.data]);

  return {
    organisation,
    setOrganisation,
    fetcher,
    isLoading: fetcher.state !== "idle",
  };
}
