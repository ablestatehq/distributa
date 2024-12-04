import { useMemo } from "react";
import { Select, Button } from ".";

import { useNavigate } from "react-router-dom";
import { useFormikContext } from "formik";

const InvoiceCurrencySelect = ({ optionData, ...props }) => {
  const navigate = useNavigate();

  const lastOption = {
    value: "new",
    label: (
      <div className="border-t border-t-[#CCCCCC] bg-white p-3">
        <Button
          type="button"
          className="font-medium text-[0.5rem] px-2 h-4 py-0 align-middle border-transparent text-black"
          onClick={() => navigate("/settings/currency")}
          kind="secondary"
        >
          Set Currencies
        </Button>
      </div>
    ),
    isDisabled: true,
  };

  const options = useMemo(() => {
    return [
      ...optionData.map((option) => {
        return {
          value: option.value,
          label: (
            <div className="p-3 font-satoshi text-tiny">{option.label}</div>
          ),
        };
      }),
      lastOption,
    ];
  }, [optionData]);

  const setFieldValue = useFormikContext().setFieldValue;

  const handleChange = (selectedOption) => {
    setFieldValue(props.name, selectedOption.value);
  };

  return <Select handleChange={handleChange} options={options} {...props} />;
};

export default InvoiceCurrencySelect;
