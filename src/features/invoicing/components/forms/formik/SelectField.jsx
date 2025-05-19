import React from "react";
import { SelectField as BaseFormikSelectField } from "../../../../../components/common/forms/formik";
import fieldStyles from "../../../styles/fieldStyles";

/**
 * Invoice-specific Formik select field
 */
const SelectField = (props) => (
  <BaseFormikSelectField
    labelClassName={fieldStyles.label}
    containerClassName={fieldStyles.container}
    {...props}
  />
);

export default SelectField;
