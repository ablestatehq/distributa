import React from "react";
import cn from "../../../utils/cn";

function PlusSquare({ variation = "blue" }) {
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
        d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM12 8v8M8 12h8"
        className={cn({
          "stroke-[#111111]": variation === "black",
          "stroke-accent": variation === "blue",
        })}
      ></path>
    </svg>
  );
}

export default PlusSquare;
