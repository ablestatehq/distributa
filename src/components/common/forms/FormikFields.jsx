import React from "react";
import { useField, useFormikContext } from "formik";
import cn from "../../../utils/cn";

/**
 * A reusable text input field component for Formik forms
 */
export const FormikTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;

  return (
    <div className="w-full flex flex-col gap-y-2">
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="font-satoshi font-medium text-tiny leading-100 tracking-normal"
        >
          {label}
        </label>
      )}
      <input
        {...field}
        {...props}
        className={cn(
          "w-full border border-greyborder focus:border-accent p-3 bg-white disabled:text-greyborder font-satoshi font-normal text-tiny outline-none placeholder-black",
          {
            "border-error focus:border-error": hasError,
          },
          props.className
        )}
      />
      {hasError && (
        <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
          {meta.error}
        </div>
      )}
    </div>
  );
};

/**
 * A reusable textarea field component for Formik forms
 */
export const FormikTextAreaField = ({ label, rows = 3, ...props }) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;

  return (
    <div className="w-full flex flex-col gap-y-2">
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="font-satoshi font-normal text-tiny leading-100 tracking-normal"
        >
          {label}
        </label>
      )}
      <textarea
        {...field}
        {...props}
        rows={rows}
        className={cn(
          "resize-none border outline-none border-greyborder focus:border-accent p-3 bg-white disabled:text-greyborder font-satoshi font-normal text-tiny placeholder:text-black",
          {
            "border-error focus:border-error": hasError,
          },
          props.className
        )}
      />
      {hasError && (
        <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
          {meta.error}
        </div>
      )}
    </div>
  );
};

/**
 * A reusable select field component for Formik forms
 */
export const FormikSelectField = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;

  return (
    <div className="w-full flex flex-col gap-y-2">
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="font-satoshi font-medium text-tiny leading-100 tracking-normal"
        >
          {label}
        </label>
      )}
      <select
        {...field}
        {...props}
        className={cn(
          "w-full border border-greyborder focus:border-accent p-3 bg-white disabled:text-greyborder font-satoshi font-normal text-tiny outline-none placeholder-black",
          {
            "border-error focus:border-error": hasError,
          },
          props.className
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hasError && (
        <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
          {meta.error}
        </div>
      )}
    </div>
  );
};

/**
 * A reusable calculated field component that displays a value
 */
export const FormikCalculatedField = ({ label, value, formatter }) => {
  return (
    <div className="flex justify-between py-2">
      <span className="font-satoshi font-normal text-tiny leading-100 tracking-normal">
        {label}
      </span>
      <span className="font-satoshi font-medium text-tiny leading-120 tracking-normal">
        {formatter ? formatter(value) : value}
      </span>
    </div>
  );
};

/**
 * A reusable numeric field with calculation side effects
 */
export const FormikCalculatedInputField = ({
  label,
  onValueChange,
  ...props
}) => {
  const { setFieldValue, values } = useFormikContext();
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldValue(name, value);

    if (onValueChange) {
      onValueChange(name, value, values, setFieldValue);
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-2">
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="font-satoshi font-medium text-tiny leading-100 tracking-normal"
        >
          {label}
        </label>
      )}
      <input
        {...field}
        {...props}
        onChange={handleChange}
        className={cn(
          "w-full border border-greyborder focus:border-accent p-3 bg-white disabled:text-greyborder font-satoshi font-normal text-tiny outline-none placeholder-black",
          {
            "border-error focus:border-error": hasError,
          },
          props.className
        )}
      />
      {hasError && (
        <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
          {meta.error}
        </div>
      )}
    </div>
  );
};
