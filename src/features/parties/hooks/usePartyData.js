import { useState, useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { toast } from "react-toastify";

export function usePartyData(initialPartyData) {
  const [party, setParty] = useState(initialPartyData);
  const fetcher = useFetcher();

  useEffect(() => {
    if (
      (fetcher.state === "idle" || fetcher.state == "loading") &&
      fetcher.data?.success
    ) {
      toast.success(fetcher.data.message);

      if (fetcher?.data?.party) {
        setParty((prev) => ({ ...prev, ...fetcher.data.party }));
      }
    } else if (
      (fetcher.state === "idle" || fetcher.state == "loading") &&
      fetcher.data?.error
    ) {
      toast.error(fetcher.data.error);
    }
  }, [fetcher.state, fetcher.data]);

  return {
    party,
    setParty,
    fetcher,
    isLoading: fetcher.state !== "idle",
  };
}
