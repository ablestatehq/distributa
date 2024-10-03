import React from "react";
import cn from "../../../utils/cn";

function Book({ variation = "blue" }) {
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
        d="M4 19.5A2.5 2.5 0 016.5 17H20"
      ></path>
      <path
        className={cn({
          "stroke-[#111111]": variation === "black",
          "stroke-accent": variation === "blue",
        })}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2v0z"
      ></path>
    </svg>
  );
}

export default Book;
