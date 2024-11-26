import { useMemo } from "react";
import { Select } from ".";
import { useFormikContext } from "formik";
import { Button } from ".";
import { useNavigate } from "react-router-dom";

const CategorySelect = ({ optionData, ...props }) => {
  const { values } = useFormikContext();
  const navigate = useNavigate();

  const defaultOption = {
    value: "",
    label: <div className="font-satoshi text-tiny">Select One</div>,
  };

  const lastOption = {
    value: "new",
    label: (
      <Button
        type="button"
        className="font-bold text-small w-full"
        onClick={() => navigate("/settings/categories")}
        kind="secondary"
      >
        Create Category
      </Button>
    ),
    isDisabled: true,
  };

  const generateOption = (category) => ({
    value: category.$id,
    label: <div className="font-satoshi text-tiny">{category.name}</div>,
  });

  const options = useMemo(() => {
    if (values.flow_type === "income" && optionData?.income) {
      return [
        defaultOption,
        ...[...optionData.both, ...optionData.income].map(generateOption),
        lastOption,
      ];
    }

    if (values.flow_type === "expense" && optionData?.expense) {
      return [
        defaultOption,
        ...[...optionData.both, ...optionData.expense].map(generateOption),
        lastOption,
      ];
    }

    return [defaultOption, lastOption];
  }, [values.flow_type, optionData]);

  return <Select options={options} {...props} />;
};

export default CategorySelect;
