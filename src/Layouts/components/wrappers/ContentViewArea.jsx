import React from "react";

const ContentViewArea = ({ children }) => {
  return (
    <section className="p-6 md:py-16 md:px-8 flex-1 flex flex-col w-full overflow-hidden">
      {children}
    </section>
  );
};

export default ContentViewArea;
