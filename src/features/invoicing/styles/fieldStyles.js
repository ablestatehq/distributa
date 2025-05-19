import { fieldStyles as baseFieldStyles } from "../../../components/common/forms/styles/fieldStyles";

/**
 * Invoice-specific field styles
 */
export const fieldStyles = {
  // Start with base styles
  ...baseFieldStyles,

  // Override with invoice-specific styles
  // Container styles
  container: "mb-4",
  calculatedContainer: "mb-2",

  // Label styles
  label:
    "font-satoshi font-bold text-tiny leading-100 tracking-normal text-gray-800",
};

export default fieldStyles;
