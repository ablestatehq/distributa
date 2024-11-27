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
    label: <div className="p-3 font-satoshi text-tiny">Select One</div>,
  };

  const lastOption = {
    value: "new",
    label: (
      <div className="border-t border-t-[#CCCCCC] bg-white p-3">
        <Button
          type="button"
          className="font-medium text-[0.5rem] px-2 h-4 py-0 align-middle border-transparent text-black"
          onClick={() => navigate("/settings/categories")}
          kind="secondary"
        >
          Create Category
        </Button>
      </div>
    ),
    isDisabled: true,
  };

  const generateOption = (category) => ({
    value: category.$id,
    label: <div className="p-3 font-satoshi text-tiny">{category.name}</div>,
  });

  const options = useMemo(() => {
    if (values.flow_type === "income" && optionData) {
      const bothOptions = optionData.both || [];
      const incomeOptions = optionData.income || [];

      return [
        defaultOption,
        ...[...bothOptions, ...incomeOptions].map(generateOption),
        lastOption,
      ];
    }

    if (values.flow_type === "expense" && optionData) {
      const bothOptions = optionData.both || [];
      const expenseOptions = optionData.expense || [];

      return [
        defaultOption,
        ...[...bothOptions, ...expenseOptions].map(generateOption),
        lastOption,
      ];
    }

    return [defaultOption, lastOption];
  }, [values.flow_type, optionData]);

  return <Select options={options} {...props} />;
};

export default CategorySelect;
