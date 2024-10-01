import React from "react";
import cn from "../../../utils/cn";

const FolderPlus = ({ variation = "blue" }) => {
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
        d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2v11zM12 11v6M9 14h6"
        className={cn({
          "stroke-[#111111]": variation === "black",
          "stroke-accent": variation === "blue",
        })}
      ></path>
    </svg>
  );
};

export default FolderPlus;
