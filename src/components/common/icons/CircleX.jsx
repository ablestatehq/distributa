import React from "react";
import cn from "../../../utils/cn";

function CircleX({ variation = "blue" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="fill-none w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM15 9l-6 6M9 9l6 6"
        className={cn({
          "stroke-[#111111]": variation === "black",
          "stroke-accent": variation === "blue",
        })}
      ></path>
    </svg>
  );
}

export default CircleX;
