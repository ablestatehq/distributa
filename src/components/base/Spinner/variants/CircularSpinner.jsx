import React, { memo } from "react";
import cn from "../../../../utils/cn";
import { SPINNER_SIZES } from "../constants";

const CircularSpinner = memo(
  ({ size = "md", color = "current", className, ...props }) => {
    const classes = cn(
      "rounded-full animate-spin border-2 border-t-transparent",
      SPINNER_SIZES[size],
      {
        "border-current": color === "current",
        "border-white": color === "white",
        "border-accent": color === "primary",
        "border-grey": color === "secondary",
        "border-black": color === "dark",
      },
      className
    );

    return (
      <div className={classes} role="status" aria-hidden="true" {...props} />
    );
  }
);

CircularSpinner.displayName = "CircularSpinner";
export default CircularSpinner;
