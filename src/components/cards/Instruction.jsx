import React from "react";

const Instruction = ({ icon, title, description }) => {
  return (
    <article className="flex flex-col gap-y-2 bg-grey p-8 rounded">
      <header className="flex flex-col gap-y-2">
        <i>{icon}</i>
        <h3 className="font-archivo font-medium text-small leading-120 tracking-normal">
          {title}
        </h3>
      </header>
      <p className="font-satoshi font-normal text-small leading-150 tracking-normal">
        {description}
      </p>
    </article>
  );
};

export default Instruction;
