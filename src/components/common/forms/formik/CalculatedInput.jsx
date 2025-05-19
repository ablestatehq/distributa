import { useField, useFormikContext } from "formik";
import TextField from "../fields/TextField";

/**
 * A Formik-connected input field with calculation side effects
 */
const CalculatedInput = ({ onValueChange, ...props }) => {
  const { setFieldValue, values } = useFormikContext();
  const [field, meta] = useField(props);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldValue(name, value);

    if (onValueChange) {
      onValueChange(name, value, values, setFieldValue);
    }
  };

  return (
    <TextField
      {...field}
      {...props}
      onChange={handleChange}
      error={meta.error}
      touched={meta.touched}
    />
  );
};

export default CalculatedInput;
