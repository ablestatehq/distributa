import { useMemo } from "react";
import { Button, Select } from ".";
import { useNavigate } from "react-router-dom";

const PartySelect = ({ optionData, ...props }) => {
  const navigate = useNavigate();

  const lastOption = {
    value: "new",
    label: (
      <Button
        type="button"
        className="font-bold text-small w-full"
        onClick={() => navigate("/settings/parties")}
        kind="secondary"
      >
        Create Party
      </Button>
    ),
    isDisabled: true,   
  };

  const generateOption = (option) => ({
    value: option.$id,
    label: <div className="font-satoshi text-tiny">{option.name}</div>,
  });

  const options = useMemo(() => {
    if (optionData.total > 0)
      return [...optionData.documents.map(generateOption), lastOption];

    return [lastOption];
  }, [optionData.documents, optionData.total]);

  return <Select options={options} {...props} />;
};

export default PartySelect;
