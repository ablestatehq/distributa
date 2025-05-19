import React from "react";
import { components } from "react-select";

export const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        className="w-4 h-4 fill-none"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4 6 4 4 4-4"
          className="stroke-[#cccccc] stroke-1"
        ></path>
      </svg>
    </components.DropdownIndicator>
  );
};

// You can add more custom components here as needed
export const ClearIndicator = (props) => {
  return (
    <components.ClearIndicator {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        className="w-3 h-3 fill-none"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4L4 12M4 4l8 8"
          className="stroke-[#cccccc] stroke-1.5"
        ></path>
      </svg>
    </components.ClearIndicator>
  );
};

// Add more custom components as needed
export const NoOptionsMessage = (props) => {
  return (
    <components.NoOptionsMessage {...props}>
      <div>No options available</div>
    </components.NoOptionsMessage>
  );
};

export const LoadingMessage = (props) => {
  return (
    <components.LoadingMessage {...props}>
      <div className="flex items-center justify-center py-3.5">
        <span className="mr-2 font-satoshi font-normal text-tiny leading-100 tracking-normal">
          Loading
        </span>
        <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    </components.LoadingMessage>
  );
};

export default {
  DropdownIndicator,
  ClearIndicator,
  NoOptionsMessage,
  LoadingMessage,
};
