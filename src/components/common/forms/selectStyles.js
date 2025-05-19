export const selectStyles = {
  placeholderStyles:
    "px-3 py-3.5 font-satoshi font-normal text-tiny leading-100 tracking-normal",
  selectInputStyles: "",
  valueContainerStyles:
    "font-satoshi font-normal text-tiny leading-100 tracking-normal",
  singleValueStyles: "",
  multiValueStyles: "bg-gray-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5",
  multiValueLabelStyles: "leading-6 py-0.5",
  multiValueRemoveStyles:
    "border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md",
  indicatorsContainerStyles: "",
  clearIndicatorStyles:
    "text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800",
  indicatorSeparatorStyles: "none",
  dropdownIndicatorStyles: "py-3 px-1.5",
  menuStyles: "bg-[#F5F5F5] max-h-[200px] overflow-y-auto",
  menuListStyles:
    "h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100",
  groupHeadingStyles: "ml-3 mt-2 mb-1 text-gray-500 text-sm",
  noOptionsMessageStyles:
    "text-black text-center p-3 font-satoshi text-[0.5rem] leading-100 tracking-normal",

  // Object-based styles
  optionStyles: {
    base: "hover:cursor-pointer font-satoshi text-tiny leading-100 tracking-normal",
    focus: "bg-gray-100 active:bg-secondary-50",
    selected: "font-satoshi text-tiny bg-accent-100 hover:bg-accent-100",
  },
  controlStyles: {
    base: "font-satoshi text-tiny leading-100 tracking-normal bg-white disabled:placeholder:text-greyborder",
    focus: "border-error ring-none",
    nonFocus: "border-secondary-100",
  },

  // React-select's styles object
  reactSelectStyles: {
    input: (base) => ({
      ...base,
      "input:focus": {
        boxShadow: "none",
      },
      margin: 0,
      padding: 12,
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
  },
};

export default selectStyles;
