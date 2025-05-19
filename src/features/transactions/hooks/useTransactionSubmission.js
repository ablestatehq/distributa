import { useEffect, useMemo } from "react";
import { useFetcher, useNavigate, useLocation } from "react-router-dom";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "../../../data/constants/pagination";
import { toast } from "react-toastify";
import { useState } from "react";

export function useTransactionSubmission(handleClose = null) {
  const transactionFetcher = useFetcher();
  const navigate = useNavigate();
  const location = useLocation();
  const [localStorageAvailable, setLocalStorageAvailable] = useState(true);

  const parentPath = useMemo(
    () => location.pathname.split("/")[1],
    [location.pathname]
  );

  useEffect(() => {
    try {
      const testKey = "_test_localStorage_";
      localStorage.setItem(testKey, "test");
      const testValue = localStorage.getItem(testKey);
      localStorage.removeItem(testKey);

      if (testValue !== "test") {
        setLocalStorageAvailable(false);
        console.error("localStorage doesn't appear to be working properly");
      }
    } catch (error) {
      setLocalStorageAvailable(false);
      console.error("localStorage is not available:", error);
    }
  }, []);

  useEffect(() => {
    if (
      transactionFetcher.state === "idle" &&
      transactionFetcher.data?.success
    ) {
      toast.success(transactionFetcher.data.message);
      if (localStorageAvailable) {
        localStorage.removeItem("transactionFormData");
      }
      if (handleClose && typeof handleClose === "function") {
        handleClose();
      }
      navigate(
        `/${parentPath}?page=${DEFAULT_PAGE}&pageSize=${DEFAULT_PAGE_SIZE}`
      );
    } else if (
      transactionFetcher.state === "idle" &&
      transactionFetcher.data?.error
    ) {
      toast.error(transactionFetcher.data.message);
    }
  }, [transactionFetcher.state, transactionFetcher.data, navigate, parentPath]);

  const isLoading = useMemo(
    () => transactionFetcher.state === "submitting",
    [transactionFetcher.state]
  );

  const submitTransaction = useMemo(
    () => (data) => {
      transactionFetcher.submit(JSON.stringify(data), {
        method: "post",
        action: `/${parentPath}/new`,
        encType: "application/json",
      });
    },
    [transactionFetcher, parentPath]
  );

  return {
    fetcher: transactionFetcher,
    submitTransaction,
    isLoading,
  };
}
