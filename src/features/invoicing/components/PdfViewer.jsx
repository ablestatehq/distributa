import React from "react";
import PropTypes from "prop-types";
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import PdfLoader from "../../../components/common/loaders/PdfLoader";
import PdfError from "./PdfError";

/**
 * PDF Viewer component with fallback mechanisms
 */
const PdfViewer = ({
  blobState,
  workerSrc,
  pdfError,
  debugInfo,
  useIframeFallback,
  isNavigating,
  handleWorkerError,
  handleViewerError,
  setUseIframeFallback,
}) => {
  // Check if URL is valid before rendering Viewer
  if (
    !blobState.url ||
    typeof blobState.url !== "string" ||
    !blobState.url.startsWith("blob:")
  ) {
    return <PdfLoader />;
  }

  // If we've decided to use iframe fallback
  if (useIframeFallback) {
    return (
      <div className="h-full w-full">
        <iframe
          src={blobState.url}
          title="PDF Document"
          className="w-full h-full border-0"
        />
      </div>
    );
  }

  // If worker isn't ready yet, show loading and auto-switch to iframe after delay
  if (!workerSrc) {
    // Set a timeout to switch to iframe fallback if worker doesn't load
    setTimeout(() => {
      if (!workerSrc) {
        console.log("Worker not loaded after timeout, using iframe fallback");
        setUseIframeFallback(true);
      }
    }, 3000); // 3 second timeout for worker loading

    return <PdfLoader />;
  }

  if (pdfError) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <p className="text-error font-bold">Error loading PDF viewer</p>
        <p className="text-error">{pdfError}</p>
        <button
          onClick={() => setUseIframeFallback(true)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Simple Viewer
        </button>
      </div>
    );
  }

  // Custom render error function that uses our PdfError component
  const renderError = (error) => {
    // Call the original handler to update state
    handleViewerError(error);

    // Return the error component
    return <PdfError error={error} />;
  };

  return (
    <div className="h-full w-full overflow-hidden">
      <Worker workerUrl={workerSrc} onError={handleWorkerError}>
        {isNavigating ? (
          <PdfLoader />
        ) : (
          <Viewer
            fileUrl={blobState.url}
            theme={{
              theme: "light",
            }}
            renderError={renderError}
            renderLoader={() => <PdfLoader />}
          />
        )}
      </Worker>
      {debugInfo && (
        <div className="absolute bottom-0 left-0 right-0 bg-gray-100 p-2 text-xs overflow-auto max-h-32">
          <pre>{debugInfo}</pre>
        </div>
      )}
    </div>
  );
};

PdfViewer.propTypes = {
  blobState: PropTypes.shape({
    url: PropTypes.string,
    loading: PropTypes.bool,
    error: PropTypes.object,
  }).isRequired,
  workerSrc: PropTypes.string,
  pdfError: PropTypes.string,
  debugInfo: PropTypes.string,
  useIframeFallback: PropTypes.bool.isRequired,
  isNavigating: PropTypes.bool.isRequired,
  handleWorkerError: PropTypes.func.isRequired,
  handleViewerError: PropTypes.func.isRequired,
  setUseIframeFallback: PropTypes.func.isRequired,
};

export default PdfViewer;
