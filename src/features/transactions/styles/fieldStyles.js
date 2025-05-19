import { fieldStyles as baseFieldStyles } from "../../../components/common/forms/styles/fieldStyles";

/**
 * Transaction-specific field styles
 */
export const fieldStyles = {
  // Start with base styles
  ...baseFieldStyles,

  // Label styles
  label: "font-satoshi font-normal text-small leading-100 tracking-normal",
};

export default fieldStyles;
