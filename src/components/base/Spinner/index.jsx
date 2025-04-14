import React, { memo } from "react";
import {
  DefaultSpinner,
  CircularSpinner,
  DotsSpinner,
  PulseSpinner,
} from "./variants";

//components/base/Spinner/index.jsx
/**
 * Spinner component
 * @param {Object} props
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl'} [props.size='md']
 * @param {string} [props.size='md'] - The size of the spinner (xs, sm, md, lg, xl)
 * @param {string} [props.className] - Additional CSS classes to apply to the spinner
 * @param {'current' | 'white' | 'primary' | 'secondary' | 'dark'} [props.color='current'] - The color of the spinner (current, white, primary, secondary, dark)
 * @param {'default' | 'circular' | 'dots' | 'pulse'} [props.variant='default'] - The variant of the spinner (default, circular, dots, pulse)
 * @returns {React.ReactElement}
 */

const Spinner = memo(({ variant = "default", ...props }) => {
  const spinnerComponents = {
    default: DefaultSpinner,
    circular: CircularSpinner,
    dots: DotsSpinner,
    pulse: PulseSpinner,
  };

  const SpinnerComponent = spinnerComponents[variant];
  return <SpinnerComponent {...props} />;
});

export default Spinner;
