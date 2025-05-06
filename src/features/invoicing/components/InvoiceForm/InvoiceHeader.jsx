import React from "react";
import { useFormikContext } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import cn from "../../../../utils/cn";
import getBase64 from "../../../../utils/getBase64";
import {
  CommonSelect,
  InvoiceCurrencySelect,
} from "../../../../components/common/forms";
import { Button } from "../../../../components/common/forms";
import { CURRENCY_LOCALE_MAP } from "../../../../data/constants";

const InvoiceHeader = ({
  paperSizeOptions,
  orientationOptions,
  currencies,
  submitButtonText = "Create Invoice",
  isLoading = false,
}) => {
  const { values, setFieldValue, touched, errors, dirty } = useFormikContext();

  return (
    <div className="flex justify-between items-start h-fit lg:items-end w-full p-4 bg-grey rounded lg:min-h-fit flex-wrap gap-y-2">
      <section className="flex flex-1 lg:flex-none w-fit gap-x-4 items-start">
        {values?.logo ? (
          <div className="relative w-24 group">
            <button
              className="cursor-pointer p-1 absolute -top-3 -right-3 lg:-top-10 bg-grey w-fit h-fit rounded-full hidden lg:hidden lg:group-hover:flex justify-center items-center z-10 border border-greyborder"
              onClick={() => {
                setFieldValue("logo", null);
              }}
              type="button"
            >
              <AiOutlineClose size={15} className="text-greyborder group" />
            </button>
            <img
              src={values.logo}
              alt="Logo"
              className="static bg-white lg:absolute -top-7 w-24 h-24 object-cover border border-greyborder"
            />
          </div>
        ) : (
          <label
            htmlFor="logo"
            className={`${cn(
              "bg-white border border-greyborder w-24 h-24 flex justify-center items-center cursor-pointer p-2 lg:-mt-7",
              {
                "border-error": touched?.logo && errors?.logo,
              }
            )}`}
          >
            <input
              type="file"
              id="logo"
              name="logo"
              className="hidden group"
              accept="image/*"
              onChange={(event) => {
                getBase64(event.currentTarget.files[0]).then((base64) =>
                  setFieldValue("logo", base64)
                );
              }}
            />
            <span className="text-center font-satoshi text-tiny leading-100 tracking-normal w-[3.75rem]">
              Add your logo
            </span>
          </label>
        )}

        <div className="flex-1 flex flex-col md:flex-row md:gap-x-4 md:items-start bg-grey gap-y-4">
          <div className="w-full md:w-32">
            <CommonSelect
              label="Paper Size"
              id="paper_size"
              name="paper_size"
              placeholder="Select One"
              loading={false}
              optionData={paperSizeOptions}
            />
          </div>
          <div className="w-full md:w-32">
            <CommonSelect
              label="Orientation"
              id="orientation"
              name="orientation"
              placeholder="Select One"
              loading={false}
              optionData={orientationOptions}
            />
          </div>
          <div className="w-full md:w-32">
            <InvoiceCurrencySelect
              label="Currency"
              id="currency"
              name="currency"
              placeholder="Select One"
              loading={false}
              optionData={currencies.map((currency) => ({
                value: currency.code,
                label: CURRENCY_LOCALE_MAP[currency.code]?.name,
              }))}
            />
          </div>
        </div>
      </section>
      <div className="pt-4 h-full">
        <Button
          type="submit"
          className="hidden lg:block w-fit h-fit px-6 py-4 font-bold text-small"
          disabled={isLoading || !dirty}
        >
          {isLoading ? "Processing..." : submitButtonText}
        </Button>
      </div>
    </div>
  );
};

export default InvoiceHeader;
