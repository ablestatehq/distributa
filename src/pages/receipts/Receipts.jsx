import { Suspense } from "react";
import { ContentViewAreaWrapper } from "../../Layouts/components";
import { Button } from "../../components/common/forms";
import { FileText } from "../../components/common/icons";
import { useNavigate, useLoaderData, Await } from "react-router-dom";
import { useState } from "react";

import InvoiceRow from "../../features/invoicing/components/table/InvoiceRow";
function ReceiptTableHeader() {
  return (
    <thead>
      <tr className="border-b border-b-greyborder">
        <th className="w-auto min-w-[5.2rem] lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
          Invoice #
        </th>
        <th className="w-full min-w-[5.2rem] lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
          Billed To
        </th>
        <th className="w-full min-w-[5.2rem] lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
          Status
        </th>
        <th className="w-auto lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start"></th>
        <th className="w-auto min-w-[5.2rem] lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
          Amount Due
        </th>
        <th className="w-auto lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
          Actions
        </th>
      </tr>
    </thead>
  );
}

function ReceiptsTable({ documents }) {
  return (
    <div className="h-full w-full overflow-x-auto">
      <table className="min-w-full table-fixed">
        <ReceiptTableHeader />
        <tbody>
          {documents?.map((invoice, index) => (
            <InvoiceRow
              key={invoice?.$id}
              invoiceData={invoice}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="h-full w-full overflow-x-auto">
      <table className="min-w-full table-fixed">
        <thead>
          <tr className="border-b border-b-grey">
            <th className="w-auto min-w-[5.2rem] lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
              <div className="h-4 bg-grey rounded w-20"></div>
            </th>
            <th className="w-full min-w-[5.2rem] lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
              <div className="h-4 bg-grey rounded w-20"></div>
            </th>
            <th className="w-full min-w-[5.2rem] lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
              <div className="h-4 bg-grey rounded w-20"></div>
            </th>
            <th className="w-auto lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start"></th>
            <th className="w-auto min-w-[5.2rem] lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
              <div className="h-4 bg-grey rounded w-20"></div>
            </th>
            <th className="w-auto min-w-[5.2rem] lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
              <div className="h-4 bg-grey rounded w-20"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, index) => (
            <tr key={index} className="animate-pulse">
              <td className="px-2 lg:px-4 py-4">
                <div className="h-4 bg-grey rounded w-20"></div>
              </td>
              <td className="px-2 lg:px-4 py-4">
                <div className="h-4 bg-grey rounded w-32"></div>
              </td>
              <td className="px-2 lg:px-4 py-4">
                <div className="h-4 bg-grey rounded w-16"></div>
              </td>
              <td className="px-2 lg:px-4 py-4">
                <div className="h-4 bg-grey rounded w-24"></div>
              </td>
              <td className="px-2 lg:px-4 py-4">
                <div className="h-4 bg-grey rounded w-20"></div>
              </td>
              <th className="w-auto min-w-[5.2rem] lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start flex gap-x-2">
                <div className="h-4 bg-grey rounded w-10"></div>
                <div className="h-4 bg-grey rounded w-10"></div>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EmptyState({ onCreateNew }) {
  <article className="flex flex-col items-center gap-y-4">
    <div className="flex justify-center items-center rounded-full bg-grey w-24 h-24">
      <FileText variation="black" />
    </div>
    <div className="flex flex-col gap-y-2">
      <h3 className="font-archivo font-normal text-xl leading-120 tracking-normal text-center">
        No Receipts
      </h3>
      <p className="font-satoshi font-normal text-medium leading-150 tracking-normal text-center">
        You haven't created any receipt yet.
      </p>
    </div>
    <Button
      className="w-fit px-12 py-3 font-bold text-medium"
      onClick={onCreateNew}
    >
      Create New Receipt
    </Button>
  </article>;
}

function ReceiptsHeader({ onCreateNew }) {
  const [upload, setUpload] = useState(false);

  const handleUpload = () => setUpload(true);

  return (
    <header className="flex flex-col gap-y-2">
      <h1 className="font-archivo font-normal text-xl md:text-4xl leading-110 tracking-normal">
        Receipts
      </h1>
      <hr className="invisible h-8" />
      <div className="flex justify-end gap-x-2 md:gap-x-4 lg:p-4">
        <Button
          type="button"
          className="w-fit px-6 py-3 font-bold text-small"
          onClick={onCreateNew}
        >
          New
        </Button>
        {/* <Button
          type="button"
          className="w-fit px-6 py-3 font-bold text-small"
          onClick={handleUpload}
        >
          Upload
        </Button> */}
      </div>
      <hr className="invisible h-4" />
      {upload && (
        <>
          {/* User react drag and drop */}
          <input type="file" />

          <hr className="invisible h-4" />
        </>
      )}
    </header>
  );
}

function ReceiptsContent({ data, onCreateNew }) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Await resolve={data?.receipts}>
        {(resolvedData) =>
          resolvedData?.total > 0 ? (
            <ReceiptsTable documents={resolvedData?.documents} />
          ) : (
            <EmptyState onCreateNew={onCreateNew} />
          )
        }
      </Await>
    </Suspense>
  );
}

function Receipts() {
  const data = useLoaderData();
  const navigate = useNavigate();

  const handleCreateNewReceipt = () => navigate("/receipts/internal/new");

  return (
    <ContentViewAreaWrapper>
      <section className="flex flex-col gap-y-2">
        <ReceiptsHeader onCreateNew={handleCreateNewReceipt} />
      </section>
      <main className="flex-1 flex justify-center items-center overflow-auto">
        <ReceiptsContent data={data} onCreateNew={handleCreateNewReceipt} />
      </main>
    </ContentViewAreaWrapper>
  );
}

export default Receipts;
