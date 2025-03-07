import React from "react";
import { buttonTheme } from "./theme";
import { LoadingSpinner } from "./LoadingSpinner";
import cn from "../../../utils/cn";
import Spinner from "../Spinner";

// components/base/Button/index.jsx
/**
 * Button component for user interaction
 * @param {Object} props
 * @param {'solid' | 'outline' | 'ghost' | 'link'} [props.variant='solid']
 * @param {'primary' | 'secondary' | 'danger' | 'success' | 'plain'} [props.color='primary']
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl'} [props.size='md']
 * @param {boolean} [props.isLoading=false]
 * @param {string} [props.loadingText]
 * @param {React.ReactNode} [props.startIcon]
 * @param {React.ReactNode} [props.endIcon]
 * @param {boolean} [props.iconOnly=false]
 * @param {'rounded' | 'square' | 'circle'} [props.shape='rounded']
 * @param {boolean} [props.fullWidth=false]
 * @param {React.ReactNode} props.children
 */

const Button = ({
  className,
  variant = "solid",
  color = "primary",
  size = "md",
  isLoading = false,
  loadingText,
  startIcon,
  endIcon,
  iconOnly = false,
  shape = "square",
  type = "button",
  children,
  ...props
}) => {
  const theme = buttonTheme.variants[variant][color];

  const classes = cn(
    buttonTheme.base,

    // Variant specific styles
    theme.base,
    !props.disabled && theme.hover,
    props.disabled && theme.disabled,
    theme.focus,

    // Size styles
    iconOnly ? buttonTheme.iconOnly[size] : buttonTheme.sizes[size],

    // Icon spacing
    !iconOnly && buttonTheme.iconSpacing[size],

    // Shape variations
    {
      "rounded-md": shape === "rounded",
      "rounded-none": shape === "square",
      "rounded-full": shape === "circle",
    },

    // Loading state
    isLoading && "cursor-not-allowed",

    // Custom classes
    className
  );

  // Icon sizes based on button size
  const getIconSize = () => {
    const sizes = {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-7 h-7",
    };
    return sizes[size];
  };

  const renderSpinner = (spinnerVariant = "default") => {
    const spinnerProps = {
      size,
      className: "mr-2",
      color: variant === "outline" ? color : "white",
    };

    return <Spinner variant={spinnerVariant} {...spinnerProps} />;
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          {renderSpinner()}
          {loadingText && <span className="ml-2">{loadingText}</span>}
        </>
      );
    }

    return (
      <>
        {startIcon && (
          <span className="flex-shrink-0">
            {React.cloneElement(startIcon, {
              className: cn(startIcon.props.className, getIconSize()),
            })}
          </span>
        )}
        {!iconOnly && <span>{children}</span>}
        {endIcon && (
          <span className="flex-shrink-0">
            {React.cloneElement(endIcon, {
              className: cn(endIcon.props.className, getIconSize()),
            })}
          </span>
        )}
      </>
    );
  };

  return (
    <button
      type={type}
      className={classes}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
