import { Suspense } from "react";
import { ContentViewAreaWrapper } from "../../../Layouts/components";
import InvoiceHeader from "../components/InvoiceHeader";
import InvoicesSkeleton from "../components/InvoicesSkeleton";
import InvoiceContent from "../components/InvoiceContent";
import { Await, useLoaderData } from "react-router-dom";

export function InvoicesPage() {
  const { invoices } = useLoaderData();

  return (
    <ContentViewAreaWrapper>
      <section className="flex flex-col gap-y-2">
        <InvoiceHeader />
      </section>
      <main className="flex-1 flex justify-center items-center">
        <Suspense fallback={<InvoicesSkeleton />}>
          <Await resolve={invoices}>
            {() => {
              return <InvoiceContent />;
            }}
          </Await>
        </Suspense>
      </main>
    </ContentViewAreaWrapper>
  );
}
