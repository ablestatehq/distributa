import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { Await } from "react-router-dom";
import { BlobProvider } from "@react-pdf/renderer";
import { Document } from "./index";
import PdfLoader from "../../../components/common/loaders/PdfLoader";
import PdfViewer from "./PdfViewer";

/**
 * Component for displaying PDF content
 */
const PdfContentSection = ({ invoicePromise, isNavigating, pdfRenderer }) => {
  return (
    <div className="h-full w-full overflow-y-auto">
      <Suspense
        fallback={
          <div className="w-full h-full">
            <div className="w-full h-full flex-1 animate-pulse bg-grey"></div>
          </div>
        }
      >
        <Await resolve={invoicePromise}>
          {(invoiceData) => {
            if (!invoiceData) {
              return (
                <div className="flex items-center justify-center h-full text-amber-600">
                  <p>No invoice data available</p>
                </div>
              );
            }

            return (
              <div className="h-full w-full bg-white overflow-hidden">
                {/* Custom wrapper for PDFViewer with white background */}
                <div className="w-full h-full bg-white">
                  <BlobProvider
                    document={<Document data={invoiceData} />}
                    onStart={() => {
                      if (pdfRenderer.isMounted.current) {
                        pdfRenderer.setIsGeneratingPdf(true);
                      }
                    }}
                  >
                    {(blobState) => {
                      // Use a callback instead of useEffect inside render
                      if (
                        blobState.loading !==
                          pdfRenderer.pdfLoadingState.loading ||
                        blobState.url !== pdfRenderer.pdfLoadingState.url ||
                        blobState.error !== pdfRenderer.pdfLoadingState.error
                      ) {
                        // Only update if there's a change to avoid infinite loops
                        // Use requestAnimationFrame instead of setTimeout for better performance
                        requestAnimationFrame(() => {
                          if (pdfRenderer.isMounted.current) {
                            pdfRenderer.handleBlobProviderStateChange(
                              blobState
                            );
                          }
                        });
                      }

                      if (blobState.loading || pdfRenderer.isGeneratingPdf) {
                        return <PdfLoader />;
                      }

                      if (blobState.error) {
                        console.error("BlobProvider error:", blobState.error);
                        return (
                          <div className="flex flex-col items-center justify-center h-full text-red-600 p-4">
                            <p className="font-bold">Error generating PDF</p>
                            <p>
                              {blobState.error.message ||
                                String(blobState.error)}
                            </p>
                          </div>
                        );
                      }

                      return (
                        <PdfViewer
                          blobState={blobState}
                          workerSrc={pdfRenderer.workerSrc}
                          pdfError={pdfRenderer.pdfError}
                          debugInfo={pdfRenderer.debugInfo}
                          useIframeFallback={pdfRenderer.useIframeFallback}
                          isNavigating={isNavigating}
                          handleWorkerError={pdfRenderer.handleWorkerError}
                          handleViewerError={pdfRenderer.handleViewerError}
                          setUseIframeFallback={
                            pdfRenderer.setUseIframeFallback
                          }
                        />
                      );
                    }}
                  </BlobProvider>
                </div>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

PdfContentSection.propTypes = {
  invoicePromise: PropTypes.object.isRequired,
  isNavigating: PropTypes.bool.isRequired,
  pdfRenderer: PropTypes.object.isRequired,
};

export default PdfContentSection;
