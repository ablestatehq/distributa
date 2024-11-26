import { useMemo } from "react";
import { Select } from ".";

const CommonSelect = ({ optionData, props }) => {
  console.log("Reached Here: ", optionData);
  const generateOption = (option) => ({
    value: option.value,
    label: <div className="font-satoshi text-tiny">{option.label}</div>,
  });

  const options = useMemo(() => optionData.map(generateOption), [optionData]);
  // return null;
  return <Select options={options} {...props} />;
};

export default CommonSelect;
