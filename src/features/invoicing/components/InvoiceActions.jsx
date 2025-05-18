import React from "react";
import PropTypes from "prop-types";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "../../../components/common/forms";
import { GiShare } from "react-icons/gi";
import { Document } from "./index";

/**
 * Component for invoice actions (download, share)
 */
const InvoiceActions = ({ invoiceData, isNavigating }) => {
  if (!invoiceData) {
    return <div className="text-amber-600">No invoice data available</div>;
  }

  return (
    <div className="flex flex-col gap-y-4">
      {isNavigating ? (
        <Button className="font-bold text-large py-5" disabled>
          Download
        </Button>
      ) : (
        <PDFDownloadLink
          className="font-satoshi tracking-normal text-center leading-100 font-bold text-large py-5 bg-accent border border-accent text-white disabled:bg-greyborder disabled:text-white disabled:border-greyborder hover:border-black hover:bg-black hover:text-white"
          document={<Document data={invoiceData} />}
          fileName={`#${invoiceData?.invoice_no || "invoice"}.pdf`}
          disabled={isNavigating}
        >
          {({ loading, error }) =>
            loading
              ? "Generating PDF..."
              : error
              ? `Error: ${error.message || "Failed to generate"}`
              : "Download"
          }
        </PDFDownloadLink>
      )}

      <Button
        className="font-bold text-large py-4 gap-x-2 flex justify-center items-center group"
        kind="secondary"
        disabled={isNavigating}
      >
        <GiShare className="w-6 h-6 lg:h-8 lg:w-8 text-accent group-disabled:text-greyborder group-hover:text-black" />{" "}
        Share
      </Button>
    </div>
  );
};

InvoiceActions.propTypes = {
  invoiceData: PropTypes.object,
  isNavigating: PropTypes.bool.isRequired,
};

export default InvoiceActions;
