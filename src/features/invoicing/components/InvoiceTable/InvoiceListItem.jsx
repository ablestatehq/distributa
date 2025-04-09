import { memo } from "react";
import { Edit, Delete } from "../../../../components/common/icons";
import { useInvoiceListItem } from "../../hooks";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Document from "./../document/Document";
import { Download } from "../../../../components/common/icons";

const InvoiceListItem = memo(({ invoice: initialInvoice, index }) => {
  const { invoice, actions } = useInvoiceListItem(initialInvoice);

  return (
    <tr
      className={`cursor-pointer ${index % 2 === 0 ? "bg-white" : "bg-grey"}`}
      onClick={actions.viewDetails}
      key={invoice.$id}
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
          onClick={actions.toggleEdit}
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
          onClick={actions.deleteInvoice}
        >
          <Delete />
        </button>
        <button
          type="button"
          className="font-satoshi font-normal underline text-black leading-100 tracking-normal capitalize text-tiny"
          onClick={actions.toggleEdit}
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
  );
});

export default InvoiceListItem;
