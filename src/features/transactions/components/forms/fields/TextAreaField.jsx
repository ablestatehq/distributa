import React from "react";
import { TextAreaField as BaseTextAreaField } from "../../../../../components/common/forms/fields";
import fieldStyles from "../../../styles/fieldStyles";

/**
 * Transaction-specific text area field
 */
const TextAreaField = (props) => (
  <BaseTextAreaField
    labelClassName={fieldStyles.label}
    containerClassName={fieldStyles.container}
    {...props}
  />
);

export default TextAreaField;
