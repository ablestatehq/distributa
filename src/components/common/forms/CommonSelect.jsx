import { useMemo } from "react";
import { Select } from ".";
import { useFormikContext } from "formik";

const CommonSelect = ({ optionData, ...props }) => {
  const generateOption = (option) => ({
    value: option.value,
    label: <div className="p-3 font-satoshi text-tiny">{option.label}</div>,
  });

  const options = useMemo(() => optionData.map(generateOption), [optionData]);
  const setFieldValue = useFormikContext().setFieldValue;

  const handleChange = (selectedOption) => {
    setFieldValue(props.name, selectedOption.value);
  };

  return <Select handleChange={handleChange} options={options} {...props} />;
};

export default CommonSelect;
