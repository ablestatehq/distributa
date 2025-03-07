import React from "react";
import cn from "../../../utils/cn";

function Icon({ variation = "blue" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className="fill-none h-4 w-4"
    >
      <g
        className={cn({
          "stroke-[#111111]": variation === "black",
          "stroke-accent": variation === "blue",
        })}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        clipPath="url(#clip0_653_7833)"
      >
        <path d="M8 14.667A6.667 6.667 0 108 1.333a6.667 6.667 0 000 13.334zM8 10.667V8M8 5.333h.007"></path>
      </g>
      <defs>
        <clipPath id="clip0_653_7833">
          <path fill="#fff" d="M0 0H16V16H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default Icon;
