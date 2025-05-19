import { useCallback } from "react";
import { useFetcher, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "../../../data/constants/pagination";
import { toast } from "react-toastify";

export function useCreateParty() {
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      toast.success(fetcher.data.message);
      navigate(
        `/${currentPath}?page=${DEFAULT_PAGE}&pageSize=${DEFAULT_PAGE_SIZE}`
      );
    } else if (fetcher.state === "idle" && fetcher.data?.error) {
      toast.error(fetcher.data.message);
    }
  }, [fetcher?.state, fetcher?.data, navigate]);

  const actions = {
    createTransaction: useCallback(
      (data) => {
        fetcher.submit(JSON.stringify(data), {
          method: "post",
          action: `/${currentPath}/new`,
          encType: "application/json",
        });
      },
      [fetcher]
    ),
  };

  return {
    parties,
    isLoading: fetcher.state === "submitting",
    actions,
  };
}
