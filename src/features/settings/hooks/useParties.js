import { useState, useEffect, useMemo } from "react";
import { useFetcher } from "react-router-dom";
import { toast } from "react-toastify";

export function useParties() {
  const [parties, setParties] = useState({ documents: [], total: 0 });
  const [resolving, setResolving] = useState(false);
  const partiesFetcher = useFetcher();

  useEffect(() => {
    if (partiesFetcher.state === "idle" && !partiesFetcher.data) {
      partiesFetcher.load("/settings/parties");
    }
  }, []);

  useEffect(() => {
    handlePartyData();
  }, [partiesFetcher.state, partiesFetcher.data]);

  const handlePartyData = async () => {
    if (
      partiesFetcher.state === "idle" &&
      partiesFetcher.data &&
      !partiesFetcher.data.error
    ) {
      try {
        setResolving(true);
        const parties = await partiesFetcher.data.parties;
        setParties((prev) => ({ ...prev, ...parties }));
      } catch (error) {
        toast.error(error.message || "Failed to load parties");
      } finally {
        setResolving(false);
      }
    } else if (partiesFetcher.state === "idle" && partiesFetcher.data?.error) {
      toast.error(partiesFetcher.data.message || "Failed to load parties");
    }
  };

  const isLoading = useMemo(
    () => partiesFetcher.state === "loading" || resolving,
    [partiesFetcher.state, resolving]
  );

  const refreshParties = useMemo(
    () => () => partiesFetcher.load("/settings/parties"),
    [partiesFetcher]
  );

  return {
    parties,
    isLoading,
    refreshParties,
  };
}
