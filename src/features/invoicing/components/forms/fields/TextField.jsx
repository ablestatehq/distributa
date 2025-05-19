import React from "react";
import { TextField as BaseTextField } from "../../../../../components/common/forms/fields";
import fieldStyles from "../../../styles/fieldStyles";

/**
 * Invoice-specific text field
 */
const TextField = (props) => (
  <BaseTextField
    labelClassName={fieldStyles.label}
    containerClassName={fieldStyles.container}
    {...props}
  />
);

export default TextField;
