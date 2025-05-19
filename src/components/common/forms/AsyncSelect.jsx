import { useField } from "formik";
import AsyncSelect from "react-select/async";
import clsx from "clsx";
import { selectStyles } from "./selectStyles";
import { DropdownIndicator, LoadingMessage } from "./selectComponents";
import { useEffect, useState } from "react";

const CustomAsyncSelect = ({
  label,
  loadOptions,
  defaultOptions = true,
  cacheOptions = true,
  disabled,
  handleChange,
  isClearable = false,
  isSearchable = true,
  placeholder = "Search...",
  debounceTimeout = 300,
  getOptionValue = (option) => option.value,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const { error, touched } = meta;
  const { setValue } = helpers;
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const loadInitialValue = async () => {
      if (field.value && loadOptions) {
        try {
          const options = await loadOptions("");

          const currentOption = options.find(
            (option) => getOptionValue(option) === field.value
          );

          if (currentOption) {
            setSelectedOption(currentOption);
          }
        } catch (error) {
          console.error("Error loading initial value:", error);
        }
      }
    };

    loadInitialValue();
  }, [field.value, loadOptions, getOptionValue]);

  // Custom onChange handler that updates both the form value and the selected option
  const onChangeHandler = (selected) => {
    setSelectedOption(selected);

    if (handleChange) {
      handleChange(selected);
    } else {
      // Default behavior if no custom handler is provided
      setValue(selected ? getOptionValue(selected) : "");
    }
  };

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
      <AsyncSelect
        {...field}
        onChange={onChangeHandler}
        loadOptions={loadOptions}
        defaultOptions={defaultOptions}
        cacheOptions={cacheOptions}
        closeMenuOnSelect={true}
        isClearable={isClearable}
        isDisabled={disabled}
        isSearchable={isSearchable}
        debounceTimeout={debounceTimeout}
        getOptionValue={getOptionValue}
        value={selectedOption}
        unstyled
        placeholder={placeholder}
        styles={reactSelectStyles}
        components={{
          DropdownIndicator,
          LoadingMessage,
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

export default CustomAsyncSelect;
