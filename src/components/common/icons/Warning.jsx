import React from "react";

const Warning = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={`w-4 h-4 fill-none ${className}`}
    >
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        clipPath="url(#clip0_653_7833)"
        className="stroke-accent-800"
      >
        <path d="M8 14.667A6.667 6.667 0 1 0 8 1.333a6.667 6.667 0 0 0 0 13.334M8 10.667V8M8 5.333h.007"></path>
      </g>
      <defs>
        <clipPath id="clip0_653_7833">
          <path fill="#fff" d="M0 0h16v16H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};

export default Warning;
