import React from "react";
import { FormikTextField } from "../../../../components/common/forms/FormikFields";

const InvoiceDetails = () => {
  return (
    <div className="bg-grey rounded p-4 flex flex-col gap-y-4 w-full">
      <FormikTextField
        id="title"
        name="title"
        label="Title"
        placeholder="Title"
        type="text"
      />

      <FormikTextField
        id="invoice_no"
        name="invoice_no"
        label="# Invoice"
        placeholder="00001"
        disabled={true}
        type="text"
      />

      <FormikTextField
        id="issue_date"
        name="issue_date"
        label="Issue Date"
        type="date"
      />

      <FormikTextField
        id="due_date"
        name="due_date"
        label="Due Date"
        type="date"
      />
    </div>
  );
};

export default InvoiceDetails;
