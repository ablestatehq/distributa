import React from "react";
import cn from "../../../utils/cn";

function Zap({ variation = "blue" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="fill-none h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
        className={cn({
          "stroke-[#111111]": variation === "black",
          "stroke-accent": variation === "blue",
        })}
      ></path>
    </svg>
  );
}

export default Zap;
