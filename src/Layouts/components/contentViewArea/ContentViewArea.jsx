import React from "react";

function ContentViewArea({ children }) {
  return <section className="p-6 flex flex-col h-full">{children}</section>;
}

export default ContentViewArea;
