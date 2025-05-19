import React from "react";
import { useField } from "formik";
import Select from "react-select";
import clsx from "clsx";
import { selectStyles } from "./selectStyles";
import { DropdownIndicator, ClearIndicator } from "./selectComponents";

const MultiSelect = ({
  label,
  options,
  loading,
  disabled,
  handleChange,
  isClearable = true,
  isSearchable = true,
  placeholder = "Select options...",
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const { error, touched } = meta;
  const { setValue } = helpers;

  const {
    placeholderStyles,
    selectInputStyles,
    valueContainerStyles,
    singleValueStyles,
    multiValueStyles,
    multiValueLabelStyles,
    multiValueRemoveStyles,
    indicatorsContainerStyles,
    clearIndicatorStyles,
    indicatorSeparatorStyles,
    dropdownIndicatorStyles,
    menuStyles,
    menuListStyles,
    groupHeadingStyles,
    optionStyles,
    controlStyles,
    noOptionsMessageStyles,
    reactSelectStyles,
  } = selectStyles;

  // Handle multi-select change
  const onChange = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setValue(values);
    if (handleChange) {
      handleChange(values);
    }
  };

  // Convert field.value array to array of option objects
  const getValue = () => {
    if (!field.value || field.value.length === 0) return [];
    return options.filter((option) => field.value.includes(option.value));
  };

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
        id={props.name}
        name={props.name}
        onChange={onChange}
        value={getValue()}
        closeMenuOnSelect={false}
        isClearable={isClearable}
        isLoading={loading}
        isDisabled={disabled}
        isSearchable={isSearchable}
        isMulti={true}
        options={options}
        unstyled
        placeholder={placeholder}
        styles={reactSelectStyles}
        components={{
          DropdownIndicator,
          ClearIndicator,
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

export default MultiSelect;
