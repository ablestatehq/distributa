import { useMemo } from "react";
import { Select } from ".";

const CommonSelect = ({ optionData, ...props }) => {
  const generateOption = (option) => ({
    value: option.value,
    label: <div className="p-3 font-satoshi text-tiny">{option.label}</div>,
  });

  const options = useMemo(() => optionData.map(generateOption), [optionData]);
 
  return <Select options={options} {...props} />;
};

export default CommonSelect;
