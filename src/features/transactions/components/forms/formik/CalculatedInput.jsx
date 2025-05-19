import React from "react";
import { CalculatedInput as BaseFormikCalculatedInput } from "../../../../../components/common/forms/formik";
import fieldStyles from "../../../styles/fieldStyles";

/**
 * Transaction-specific Formik calculated input field
 */
const CalculatedInput = (props) => (
  <BaseFormikCalculatedInput
    labelClassName={fieldStyles.label}
    containerClassName={fieldStyles.container}
    {...props}
  />
);

export default CalculatedInput;
