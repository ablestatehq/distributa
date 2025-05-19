import React from "react";
import { TextField as BaseFormikTextField } from "../../../../../components/common/forms/formik";
import fieldStyles from "../../../styles/fieldStyles";

/**
 * Invoice-specific Formik text field
 */
const TextField = (props) => (
  <BaseFormikTextField
    labelClassName={fieldStyles.label}
    containerClassName={fieldStyles.container}
    {...props}
  />
);

export default TextField;
