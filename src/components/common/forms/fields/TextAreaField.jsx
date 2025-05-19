import cn from "../../../../utils/cn";
import fieldStyles from "../styles/fieldStyles";

/**
 * A reusable textarea field component
 */
const TextAreaField = ({
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
  rows = 3,
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
      <textarea
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        className={cn(
          fieldStyles.textarea,
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

export default TextAreaField;
