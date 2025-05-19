import React from "react";
import { CalculatedField as BaseFormikCalculatedField } from "../../../../../components/common/forms/formik";
import fieldStyles from "../../../styles/fieldStyles";

/**
 * Transaction-specific Formik calculated field
 */
const CalculatedField = (props) => (
  <BaseFormikCalculatedField
    labelClassName={fieldStyles.label}
    containerClassName={fieldStyles.calculatedContainer}
    {...props}
  />
);

export default CalculatedField;
