import React from "react";
import { useField } from "formik";
import { components } from "react-select";
import Select from "react-select";
import clsx from "clsx";

function DropdownIndicator(props) {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        className="w-4 h-4 fill-none"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4 6 4 4 4-4"
          className="stroke-[#cccccc] stroke-1"
        ></path>
      </svg>
    </components.DropdownIndicator>
  );
}

const CustomSelect = ({ label, options, loading, disabled, handleChange, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const { error, touched } = meta;

  const placeholderStyles =
    "px-3 py-3.5 font-satoshi font-normal text-tiny leading-100 tracking-normal";
  const selectInputStyles = "";
  const valueContainerStyles =
    "font-satoshi font-normal  text-tiny leading-100 tracking-normal ";
  const singleValueStyles = "";
  const multiValueStyles =
    "bg-gray-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5";
  const multiValueLabelStyles = "leading-6 py-0.5";
  const multiValueRemoveStyles =
    "border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md";
  const indicatorsContainerStyles = "";
  const clearIndicatorStyles =
    "text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800";
  const indicatorSeparatorStyles = "none";
  const dropdownIndicatorStyles = "py-3 px-1.5";
  const menuStyles = "bg-[#F5F5F5] max-h-[200px] overflow-y-auto";
  const menuListStyles =
    "h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100";
  const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 text-sm";
  const optionStyles = {
    base: "hover:cursor-pointer  font-satoshi text-tiny leading-100 tracking-normal",
    focus: "bg-gray-100 active:bg-secondary-50",
    selected: "font-satoshi text-tiny bg-accent-50 hover:bg-accent-50 ",
  };
  const controlStyles = {
    base: "font-satoshi text-tiny leading-100 tracking-normal",
    focus: "border-secondary-500 ring-none",
    nonFocus: "border-secondary-100",
  };

  const noOptionsMessageStyles =
    "text-black text-center p-3 font-satoshi text-[0.5rem] leading-100 tracking-normal";

  // const handleChange = (selectedOption) => setValue(selectedOption.value);

  return (
    <div className="w-full flex flex-col gap-y-2">
      {label ? (
        <label
          className="font-satoshi font-normal text-small leading-100 tracking-normal"
          htmlFor={props.name}
        >
          {label}
        </label>
      ) : null}
      <Select
        {...field}
        onChange={handleChange}
        value={options.find((option) => option.value === field.value)}
        closeMenuOnSelect={true}
        isClearable={false}
        isLoading={loading}
        isDisabled={disabled}
        isSearchable={false}
        options={options}
        unstyled
        placeholder="Select One"
        styles={{
          input: (base) => ({
            ...base,
            "input:focus": {
              boxShadow: "none",
            },
            margin: 0,
            padding: 0,
          }),
          multiValueLabel: (base) => ({
            ...base,
            whiteSpace: "normal",
            overflow: "visible",
          }),
          control: (base) => ({
            ...base,
            transition: "none",
          }),
        }}
        components={{
          DropdownIndicator,
        }}
        classNames={{
          control: ({ isFocused }) =>
            clsx(
              isFocused ? controlStyles.focus : controlStyles.nonFocus,
              controlStyles.base,
              meta.touched && meta.error
                ? "border border-error focus:border-error"
                : "border border-greyborder focus:border-grey"
            ),
          menuStyles: () => menuStyles,
          menuList: () => menuListStyles,
          placeholder: () => placeholderStyles,
          input: () => selectInputStyles,
          valueContainer: () => valueContainerStyles,
          singleValue: () => singleValueStyles,
          multiValue: () => multiValueStyles,
          multiValueLabel: () => multiValueLabelStyles,
          multiValueRemove: () => multiValueRemoveStyles,
          indicatorsContainer: () => indicatorsContainerStyles,
          clearIndicator: () => clearIndicatorStyles,
          indicatorSeparator: () => indicatorSeparatorStyles,
          dropdownIndicator: () => dropdownIndicatorStyles,
          menu: () => menuStyles,
          groupHeading: () => groupHeadingStyles,
          option: ({ isFocused, isSelected }) =>
            clsx(
              isFocused && optionStyles.focus,
              isSelected && optionStyles.selected,
              optionStyles.base
            ),
          noOptionsMessage: () => noOptionsMessageStyles,
        }}
      />
      {touched && error ? (
        <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default CustomSelect;
