import { useMemo } from "react";
import { Button, Select } from ".";
import { useNavigate } from "react-router-dom";
import { useFormikContext } from "formik";

const PartySelect = ({ optionData, ...props }) => {
  const navigate = useNavigate();

  const lastOption = {
    value: "new",
    label: (
      <div className="border-t border-t-[#CCCCCC] bg-white p-3">
        <Button
          type="button"
          className="font-medium text-[0.5rem] px-2 h-4 py-0 align-middle border-transparent text-black"
          onClick={() => navigate("/settings/parties")}
          kind="secondary"
        >
          Create Party
        </Button>
      </div>
    ),
    isDisabled: true,
  };

  const generateOption = (option) => ({
    value: option.$id,
    label: <div className="p-3 font-satoshi text-tiny">{option.name}</div>,
  });

  const options = useMemo(() => {
    if (optionData?.total && optionData.total > 0)
      return [...optionData.documents.map(generateOption), lastOption];

    return [lastOption];
  }, [optionData?.documents, optionData?.total]);
  
  const setFieldValue = useFormikContext().setFieldValue;
  const handleChange = (selectedOption) => {
    setFieldValue(props.name, selectedOption.value);
  };

  return <Select handleChange={handleChange} options={options} {...props} />;
};

export default PartySelect;
