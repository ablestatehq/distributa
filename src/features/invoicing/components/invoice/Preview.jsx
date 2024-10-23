import React from "react";
import Document from "../document/DocPreview";

const Preview = ({ data }) => {
  return (
    <section className="h-screen">
      <Document data={data} />
    </section>
  );
};

export default Preview;
