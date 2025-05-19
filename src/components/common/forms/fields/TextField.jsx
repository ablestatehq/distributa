import cn from "../../../../utils/cn";
import fieldStyles from "../styles/fieldStyles";

/**
 * A reusable text input field component
 */
const TextField = ({
  label,
  name,
  id,
  value,
  onChange,
  onBlur,
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
      <input
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={cn(
          fieldStyles.input,
          {
            [fieldStyles.errorInput]: hasError,
          },
          props.className
        )}
        {...props}
      />
      {hasError && <div className={fieldStyles.errorMessage}>{error}</div>}
    </div>
  );
};

export default TextField;
