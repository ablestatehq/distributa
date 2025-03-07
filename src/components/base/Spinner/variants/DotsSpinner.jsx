import React, { memo } from "react";
import cn from "../../../../utils/cn";
import { SPINNER_COLORS } from "../constants";

const DotsSpinner = memo(
  ({ size = "md", color = "current", className, ...props }) => {
    const dotClass = cn(
      "rounded-full animate-pulse",
      SPINNER_COLORS[color],
      {
        "w-1 h-1 mx-0.5": size === "xs",
        "w-1.5 h-1.5 mx-0.5": size === "sm",
        "w-2 h-2 mx-1": size === "md",
        "w-2.5 h-2.5 mx-1": size === "lg",
        "w-3 h-3 mx-1.5": size === "xl",
      },
      className
    );

    return (
      <div
        className="flex items-center"
        role="status"
        aria-hidden="true"
        {...props}
      >
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={dotClass}
            style={{ animationDelay: `${index * 0.15}s` }}
          />
        ))}
      </div>
    );
  }
);

DotsSpinner.displayName = "DotsSpinner";
export default DotsSpinner;
