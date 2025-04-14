import React, { memo } from "react";
import cn from "../../../../utils/cn";
import { SPINNER_COLORS, SPINNER_SIZES } from "../constants";

const PulseSpinner = memo(
  ({ size = "md", color = "current", className, ...props }) => {
    const classes = cn(
      "rounded-full animate-ping opacity-75",
      SPINNER_SIZES[size],
      SPINNER_COLORS[color],
      className
    );

    return (
      <div className={classes} role="status" aria-hidden="true" {...props} />
    );
  }
);

PulseSpinner.displayName = "PulseSpinner";
export default PulseSpinner;
