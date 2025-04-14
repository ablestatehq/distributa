// components/base/Spinner/variants/DefaultSpinner.jsx
import React, { memo } from "react";
import cn from "../../../../utils/cn";
import { SPINNER_SIZES, SPINNER_COLORS } from "../constants";

const DefaultSpinner = memo(
  ({ size = "md", color = "current", className, ...props }) => {
    const classes = cn(
      "animate-spin",
      SPINNER_SIZES[size],
      SPINNER_COLORS[color],
      className
    );

    return (
      <svg
        className={classes}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        role="status"
        aria-hidden="true"
        {...props}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
    );
  }
);

DefaultSpinner.displayName = "DefaultSpinner";
export default DefaultSpinner;
