import React from "react";

const ContentViewArea = ({ children }) => {
  return (
    <section className="px-6 pb-6 pt-24 md:pb-16 md:pt-24 md:px-8 lg:pt-16 flex flex-col h-full w-full overflow-auto">
      {children}
    </section>
  );
};

export default ContentViewArea;
