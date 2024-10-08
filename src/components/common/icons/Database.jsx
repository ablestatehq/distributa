import React from "react";
import cn from "../../../utils/cn";

function Database({ variation = "blue" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="fill-none h-6 w-6"
    >
      <path
        className={cn({
          "stroke-[#111111]": variation === "black",
          "stroke-accent": variation === "blue",
        })}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8c4.97 0 9-1.343 9-3s-4.03-3-9-3-9 1.343-9 3 4.03 3 9 3zM21 12c0 1.66-4 3-9 3s-9-1.34-9-3"
      ></path>
      <path
        className={cn({
          "stroke-[#111111]": variation === "black",
          "stroke-accent": variation === "blue",
        })}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"
      ></path>
    </svg>
  );
}

export default Database;
