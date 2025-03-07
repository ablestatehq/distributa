import React from "react";
import cn from "../../../utils/cn";

function List({variation = "blue"}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="fill-none w-6 h-6"
    >
      <path
        className={cn({
          "stroke-[#111111]": variation === "black",
          "stroke-accent": variation === "blue",
        })}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
      ></path>
    </svg>
  );
}

export default List;
