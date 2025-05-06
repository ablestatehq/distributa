import React from "react";
import {
  FormikTextField,
  FormikTextAreaField,
} from "../../../../components/common/forms/FormikFields";

const BillingSection = ({ title, prefix }) => (
  <section className="grid grid-cols-2 gap-2">
    <h4 className="col-span-2 font-satoshi font-medium text-small leading-100 tracking-normal">
      {title}
    </h4>
    <div className="col-span-1">
      <FormikTextField
        id={`${prefix}.name`}
        name={`${prefix}.name`}
        type="text"
        placeholder="Name"
      />
    </div>
    <div className="col-span-1">
      <FormikTextField
        id={`${prefix}.email`}
        name={`${prefix}.email`}
        type="text"
        placeholder="Email"
      />
    </div>
    <div className="col-span-2">
      <FormikTextAreaField
        name={`${prefix}.address`}
        id={`${prefix}.address`}
        rows={3}
        placeholder="Address"
      />
    </div>
  </section>
);

const BillingInfo = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-grey rounded p-4">
      <BillingSection title="Billed From" prefix="billed_from" />
      <BillingSection title="Billed To" prefix="billed_to" />
    </div>
  );
};

export default BillingInfo;
