import { useState, useEffect, useRef } from "react";

// Define PDF.js worker version - must match the version used by @react-pdf-viewer/core
const PDFJS_VERSION = "3.4.120";

// Create a worker source outside component to persist during HMR
let globalWorkerSrc = null;

/**
 * Custom hook to handle PDF rendering with fallback mechanisms
 * @returns {Object} PDF rendering state and handlers
 */
export const usePdfRenderer = () => {
  const [workerSrc, setWorkerSrc] = useState(globalWorkerSrc);
  const [pdfError, setPdfError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  const [useIframeFallback, setUseIframeFallback] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfLoadingState, setPdfLoadingState] = useState({
    loading: true,
    url: null,
    error: null,
  });

  // Track worker initialization attempts
  const workerInitAttempts = useRef(0);
  const maxWorkerInitAttempts = 3;

  // Use a ref to track if component is mounted
  const isMounted = useRef(true);

  // Setup cleanup function when component unmounts
  useEffect(() => {
    return () => {
      isMounted.current = false;
      // Cancel any pending operations when unmounting
      if (pdfLoadingState.url && pdfLoadingState.url.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(pdfLoadingState.url);
        } catch (e) {
          console.error("Error revoking blob URL:", e);
        }
      }
    };
  }, [pdfLoadingState.url]);

  // Setup the worker source with improved fallback mechanism
  useEffect(() => {
    // Skip if we already have a worker source
    if (workerSrc) {
      console.log("Worker already initialized:", workerSrc);
      return;
    }

    // Increment attempt counter
    workerInitAttempts.current += 1;

    const loadWorker = async () => {
      try {
        // console.log(
        //   `Worker initialization attempt ${workerInitAttempts.current}`
        // );

        // Try to use the CDN worker directly for better HMR compatibility
        const cdnWorkerUrl = `https://unpkg.com/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.js`;

        // For production, you might want to check for a local worker first
        // but for development with HMR, using CDN is more reliable
        if (isMounted.current) {
          // console.log("Setting worker source to:", cdnWorkerUrl);
          setWorkerSrc(cdnWorkerUrl);
          globalWorkerSrc = cdnWorkerUrl; // Store in module scope for HMR persistence
        }
      } catch (error) {
        console.error("Failed to load PDF.js worker:", error);
        setPdfError(`Failed to load PDF.js worker: ${error.message}`);

        // Check if we should try again or use fallback
        if (workerInitAttempts.current >= maxWorkerInitAttempts) {
          console.log("Max worker init attempts reached, using fallback");
          if (isMounted.current) {
            setUseIframeFallback(true);
          }
        } else {
          // Try again after a short delay
          setTimeout(loadWorker, 1000);
        }
      }
    };

    loadWorker();
  }, [workerSrc]);

  // Function to handle worker errors
  const handleWorkerError = (error) => {
    console.error("Worker error:", error);
    if (isMounted.current) {
      setPdfError(
        `Worker error: ${error.message || "Failed to load PDF worker"}`
      );

      // If worker fails, switch to iframe fallback
      setUseIframeFallback(true);
    }
  };

  // Function to handle viewer errors
  const handleViewerError = (error) => {
    console.error("Viewer error:", error);
    if (isMounted.current) {
      setDebugInfo(
        JSON.stringify(
          {
            error: error.message,
            stack: error.stack,
            name: error.name,
          },
          null,
          2
        )
      );

      // Immediately try iframe fallback on error
      setUseIframeFallback(true);
    }

    // Return error data instead of JSX
    return {
      title: "Error rendering PDF",
      message: error.message,
      action: {
        label: "Switch to HTML Preview",
        handler: "preview"
      }
    };
  };

  // Handler for BlobProvider state changes
  const handleBlobProviderStateChange = (state) => {
    if (!isMounted.current) return; // Prevent state updates if component is unmounting

    console.log("BlobProvider state:", {
      hasBlob: !!state.blob,
      hasUrl: !!state.url,
      loading: state.loading,
      hasError: !!state.error,
    });

    setPdfLoadingState({
      loading: state.loading,
      url: state.url,
      error: state.error,
    });

    // Update the generating state
    setIsGeneratingPdf(state.loading);
  };

  // Force iframe fallback after timeout if still loading
  useEffect(() => {
    let timeoutId;

    if (pdfLoadingState.loading && !useIframeFallback) {
      timeoutId = setTimeout(() => {
        if (isMounted.current && pdfLoadingState.loading) {
          console.log(
            "PDF loading timeout reached, switching to iframe fallback"
          );
          setUseIframeFallback(true);
        }
      }, 10000); // 10 seconds timeout
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [pdfLoadingState.loading, useIframeFallback]);

  return {
    workerSrc,
    pdfError,
    debugInfo,
    useIframeFallback,
    isGeneratingPdf,
    pdfLoadingState,
    setUseIframeFallback,
    handleWorkerError,
    handleViewerError,
    handleBlobProviderStateChange,
    isMounted,
  };
};
