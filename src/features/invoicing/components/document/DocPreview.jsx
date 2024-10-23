import React from "react";
import Page from "./Page";

const DocPreview = ({ data }) => {
  return (
    <div className="flex gap-2 justify-center lg:justify-start flex-wrap">
      <Page data={data} />
    </div>
  );
};

export default DocPreview;
