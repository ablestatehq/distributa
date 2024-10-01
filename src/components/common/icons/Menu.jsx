import React from "react";
import cn from "../../../utils/cn";

function Menu({ variation = "blue" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
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
        d="M3 6h18M3 12h18M3 18h18"
      ></path>
    </svg>
  );
}

export default Menu;
