import React, { useState, Fragment, useEffect } from "react";
import { useNavigate, useFetcher } from "react-router-dom";
import { Delete, Download, Edit } from "../../../../components/common/icons";
import { EditInvoiceStatus } from "../../../../components/Modals";
import Document from "../document/Document";
import { PDFDownloadLink } from "@react-pdf/renderer";

const InvoiceRow = React.memo(({ invoiceData, index }) => {
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const [editInvoice, setEditInvoice] = useState(null);
  const handleEditStatus = (invoice) => setEditInvoice(invoice);
  const [invoice, setInvoice] = useState(invoiceData);

  const handleClose = () => setEditInvoice(null);

  const handleViewInvoice = (id) => navigate(`/invoices/${id}`);

  const handleEditInvoice = (id) => navigate(`/invoices/${id}/edit`);

  useEffect(() => {
    if (
      fetcher &&
      fetcher.data?.success &&
      fetcher?.data?.data?.$id === invoiceData.$id
    ) {
      setInvoice((invoice) => ({ ...invoice, ...fetcher.data?.data }));
    }
  }, [fetcher.data]);

  return (
    <Fragment key={invoice?.$id}>
      <tr
        className={`cursor-pointer ${index % 2 === 0 ? "bg-white" : "bg-grey"}`}
        onClick={() => handleViewInvoice(invoice?.$id)}
      >
        <td className="w-auto min-w-[5.2rem] lg:min-w-[8.2rem] font-satoshi font-medium text-tiny leading-100 tracking-normal px-2 lg:px-4 py-3 text-start">
          {invoice?.invoice_no}
        </td>
        <td className="w-full min-w-[5.2rem] lg:min-w-[8.2rem] font-satoshi font-medium text-tiny leading-100 tracking-normal px-2 lg:px-4 py-3 text-start">
          {invoice?.billed_to?.name}
        </td>
        <td className="w-full min-w-[5.2rem] lg:min-w-[8.2rem] font-satoshi font-medium text-tiny leading-100 tracking-normal px-2 lg:px-4 py-3 text-start capitalize">
          {invoice?.status}
        </td>
        <td className="w-auto font-satoshi font-medium text-tiny leading-100 tracking-normal lg:px-4 py-3 text-start relative">
          <button
            type="button"
            className="outline-none"
            onClick={(event) => {
              event.stopPropagation();
              handleEditStatus(index);
            }}
          >
            <Edit />
          </button>
        </td>
        <td className="w-auto min-w-[5.2rem] lg:min-w-[8.2rem] font-satoshi font-medium text-tiny leading-100 tracking-normal px-2 lg:px-4 py-3 text-start">
          {invoice?.amount_due}
        </td>
        <td className="w-auto font-satoshi font-medium text-tiny leading-100 tracking-normal px-2 lg:px-4 py-3 text-start flex gap-x-2">
          <button
            type="button"
            className="group font-satoshi font-normal underline text-error leading-100 tracking-normal capitalize text-tiny outline-none"
            onClick={async (event) => {
              event.stopPropagation();
              console.log("Let's invoke the deleting action here");
            }}
          >
            <Delete />
          </button>
          <button
            type="button"
            className="font-satoshi font-normal underline text-black leading-100 tracking-normal capitalize text-tiny"
            onClick={(event) => {
              event.stopPropagation();
              handleEditInvoice(invoice?.$id);
            }}
            disabled={invoice?.status === "paid"}
          >
            <Edit />
          </button>
          <button
            type="button"
            className="outline-none group"
            onClick={(event) => event.stopPropagation()}
          >
            <PDFDownloadLink
              document={<Document data={invoice} />}
              fileName={`#${invoice?.invoice_no}.pdf` || "#invoice.pdf"}
            >
              <Download />
            </PDFDownloadLink>
          </button>
        </td>
      </tr>
      {editInvoice === index && (
        <EditInvoiceStatus
          handleClose={handleClose}
          setInvoice={setInvoice}
          invoice={invoice}
          handleEditStatus={invoice}
          fetcher={fetcher}
        />
      )}
    </Fragment>
  );
});

export default InvoiceRow;
