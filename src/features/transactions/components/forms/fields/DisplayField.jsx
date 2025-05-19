import React from "react";
import { DisplayField as BaseDisplayField } from "../../../../../components/common/forms/fields";
import fieldStyles from "../../../styles/fieldStyles";

/**
 * Transaction-specific display field
 */
const DisplayField = (props) => (
  <BaseDisplayField
    labelClassName={fieldStyles.label}
    containerClassName={fieldStyles.calculatedContainer}
    {...props}
  />
);

export default DisplayField;
