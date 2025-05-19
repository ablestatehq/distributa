import React from "react";
import { SelectField as BaseSelectField } from "../../../../../components/common/forms/fields";
import fieldStyles from "../../../styles/fieldStyles";

/**
 * Transaction-specific select field
 */
const SelectField = (props) => (
  <BaseSelectField
    labelClassName={fieldStyles.label}
    containerClassName={fieldStyles.container}
    {...props}
  />
);

export default SelectField;
