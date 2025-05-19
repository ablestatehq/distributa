import React from "react";
import { TextAreaField as BaseFormikTextAreaField } from "../../../../../components/common/forms/formik";
import fieldStyles from "../../../styles/fieldStyles";

/**
 * Transaction-specific Formik text area field
 */
const TextAreaField = (props) => (
  <BaseFormikTextAreaField
    labelClassName={fieldStyles.label}
    containerClassName={fieldStyles.container}
    {...props}
  />
);

export default TextAreaField;
