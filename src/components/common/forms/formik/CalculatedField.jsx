import cn from "../../../../utils/cn";
import fieldStyles from "../styles/fieldStyles";

/**
 * A reusable calculated field component that displays a value
 */
const CalculatedField = ({
  label,
  value,
  formatter,
  labelClassName,
  containerClassName,
}) => {
  return (
    <div className={cn(fieldStyles.calculatedContainer, containerClassName)}>
      <span className={cn(fieldStyles.calculatedLabel, labelClassName)}>
        {label}
      </span>
      <span className={fieldStyles.calculatedValue}>
        {formatter ? formatter(value) : value}
      </span>
    </div>
  );
};

export default CalculatedField;
