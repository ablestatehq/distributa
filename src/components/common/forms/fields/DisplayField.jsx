import cn from "../../../../utils/cn";
import fieldStyles from "../styles/fieldStyles";

/**
 * A reusable display-only field component
 */
const DisplayField = ({
  label,
  value,
  formatter,
  labelClassName,
  containerClassName,
  valueClassName,
}) => {
  const displayValue = formatter ? formatter(value) : value;

  return (
    <div className={cn(fieldStyles.calculatedContainer, containerClassName)}>
      {label && (
        <span className={cn(fieldStyles.calculatedLabel, labelClassName)}>
          {label}
        </span>
      )}
      <span className={cn(fieldStyles.calculatedValue, valueClassName)}>
        {displayValue}
      </span>
    </div>
  );
};

export default DisplayField;
