import cn from "../../../utils/cn";
import { useField } from "formik";

const Input = ({ label, className, ...props }) => {
  const styles = {
    font: "font-normal font-satoshi text-tiny tracking-normal",
    input:
      "border border-greyborder leading-100 p-3 w-[17.375rem] focus:outline-none focus:border-accent",
    errorText: "leading-150 text-error",
    label: "text-start block",
    placeholder:
      "placeholder:font-normal placeholder:text-tiny placeholder:font-satoshi",
  };

  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;

  return (
    <div className="flex flex-col gap-y-2">
      <label
        htmlFor={props.id || props.name}
        className={cn(styles.font, styles.label)}
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        autoComplete="on"
        className={cn(
          className,
          styles.font,
          styles.input,
          styles.placeholder,
          {
            "border-error focus:border-error": hasError,
          }
        )}
      />
      {hasError ? (
        <p className={`${styles.font} ${styles.errorText}`}>{meta.error}</p>
      ) : null}
    </div>
  );
};

export default Input;
