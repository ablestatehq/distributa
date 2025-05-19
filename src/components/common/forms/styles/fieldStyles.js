/**
 * Centralized styles for form field components
 */
export const fieldStyles = {
  // Container styles
  container: "w-full flex flex-col gap-y-2",
  calculatedContainer: "flex justify-between py-2",

  // Label styles
  label: "font-satoshi font-medium text-tiny leading-100 tracking-normal",
  calculatedLabel:
    "font-satoshi font-normal text-tiny leading-100 tracking-normal",

  // Input styles
  input:
    "w-full border border-greyborder focus:border-accent p-3 bg-white disabled:text-greyborder font-satoshi font-normal text-tiny outline-none placeholder-black",
  textarea:
    "resize-none border outline-none border-greyborder focus:border-accent p-3 bg-white disabled:text-greyborder font-satoshi font-normal text-tiny placeholder:text-black",
  select:
    "w-full border border-greyborder focus:border-accent p-3 bg-white disabled:text-greyborder font-satoshi font-normal text-tiny outline-none placeholder-black",

  // Error styles
  errorInput: "border-error focus:border-error",
  errorMessage:
    "font-normal font-satoshi text-tiny tracking-normal leading-150 text-error",

  // Value styles
  calculatedValue:
    "font-satoshi font-medium text-tiny leading-120 tracking-normal",
};

export default fieldStyles;
