import React from "react";
import cn from "../../../utils/cn";

const Button = ({ className, size, kind = "primary", children, ...props }) => {
  const styles = {
    base: "py-3",
    font: "font-satoshi tracking-normal leading-100",
  };

  return (
    <button
      className={`${cn({
        "bg-accent border border-accent text-white disabled:bg-greyborder disabled:text-white disabled:border-greyborder hover:border-black hover:bg-black hover:text-white":
          kind === "primary",
        "bg-grey border border-accent text-accent disabled:border-greyborder disabled:bg-grey disabled:text-greyborder hover:border-black hover:bg-grey hover:text-black":
          kind === "secondary",
        "bg-grey border-none text-accent disabled:bg-grey disabled:text-greyborder hover:border-transparent hover:bg-grey hover:text-black":
          kind === "plain",
      })} ${cn( styles.base, styles.font, className)}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
