import { Suspense } from "react";
import { ContentViewAreaWrapper } from "../../../Layouts/components";
import InvoiceHeader from "../components/InvoiceHeader";
import InvoicesSkeleton from "../components/InvoicesSkeleton";
import InvoiceContent from "../components/InvoiceContent";

export function InvoicesPage() {
  return (
    <ContentViewAreaWrapper>
      <section className="flex flex-col gap-y-2">
        <InvoiceHeader />
      </section>
      <main className="flex flex-1 min-h-fit justify-center items-center">
        <Suspense fallback={<InvoicesSkeleton />}>
          <InvoiceContent />
        </Suspense>
      </main>
    </ContentViewAreaWrapper>
  );
}
