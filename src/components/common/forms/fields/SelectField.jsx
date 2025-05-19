import cn from "../../../../utils/cn";
import fieldStyles from "../styles/fieldStyles";

/**
 * A reusable select field component
 */
const SelectField = ({
  label,
  name,
  id,
  value,
  onChange,
  onBlur,
  options = [],
  error,
  touched,
  labelClassName,
  containerClassName,
  ...props
}) => {
  const hasError = touched && error;

  return (
    <div className={cn(fieldStyles.container, containerClassName)}>
      {label && (
        <label
          htmlFor={id || name}
          className={cn(fieldStyles.label, labelClassName)}
        >
          {label}
        </label>
      )}
      <select
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={cn(
          fieldStyles.select,
          {
            [fieldStyles.errorInput]: hasError,
          },
          props.className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hasError && <div className={fieldStyles.errorMessage}>{error}</div>}
    </div>
  );
};

export default SelectField;
