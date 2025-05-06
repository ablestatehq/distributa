import { Document } from "../components";
import { Await, useLoaderData, useNavigation } from "react-router-dom";
import { Suspense, useState } from "react";
import { ContentViewAreaWrapper } from "../../../Layouts/components";
import {
  InvoiceActions,
  PdfContentSection,
  LetterheadToggle,
} from "../components";
import { usePdfRenderer } from "../hooks/usePdfRenderer";
import { Button } from "../../../components/common/forms";

/**
 * Invoice preview page component
 */
export const InvoicePage = () => {
  const data = useLoaderData();
  const [showLetterhead, setShowLetterhead] = useState(false);
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  // Use the custom PDF renderer hook
  const pdfRenderer = usePdfRenderer();

  const handleLetterheadToggle = () => {
    setShowLetterhead((prev) => !prev);
  };

  return (
    <ContentViewAreaWrapper>
      <div className="flex flex-col h-full">
        <header className="flex flex-shrink-0 w-full justify-between px-5 py-3">
          <h1 className="font-archivo font-normal text-xl leading-110 tracking-normal">
            Preview
          </h1>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 flex-1 overflow-hidden">
          {/* PDF Content Section */}
          <section className="flex flex-1 overflow-hidden flex-col lg:py-4 px-6 lg:px-0 gap-y-4 lg:col-span-1">
            <PdfContentSection
              invoicePromise={data?.invoice}
              isNavigating={isNavigating}
              pdfRenderer={pdfRenderer}
              showLetterhead={showLetterhead}
            />
          </section>

          {/* Actions Section */}
          <section className="flex lg:h-full flex-col p-8 justify-center flex-shrink-0">
            <div className="flex flex-col gap-y-16 lg:max-w-[26rem]">
              {/* Letterhead Toggle */}
              <LetterheadToggle
                showLetterhead={showLetterhead}
                onToggle={handleLetterheadToggle}
              />

              {/* Download and Share Actions */}
              <Suspense
                fallback={
                  <Button className="font-bold text-large py-5" disabled>
                    Download
                  </Button>
                }
              >
                <Await resolve={data?.invoice}>
                  {(invoiceData) => (
                    <InvoiceActions
                      invoiceData={invoiceData}
                      isNavigating={isNavigating}
                      showLetterhead={showLetterhead}
                    />
                  )}
                </Await>
              </Suspense>
            </div>
          </section>
        </main>
      </div>
    </ContentViewAreaWrapper>
  );
};
