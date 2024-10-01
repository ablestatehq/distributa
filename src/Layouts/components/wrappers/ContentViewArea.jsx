import React from "react";

const ContentViewArea = ({ children }) => {
  return (
    <section className="p-6 md:py-16 md:px-8 flex flex-col h-full w-full">{children}</section>
  );
};

export default ContentViewArea;
