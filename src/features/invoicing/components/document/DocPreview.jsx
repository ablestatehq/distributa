import React from "react";
import Content from "./Content";

const DocPreview = ({ data }) => {
  return (
    <div className="flex gap-2 justify-center lg:justify-start flex-wrap">
      <Content data={data} />
    </div>
  );
};

export default DocPreview;
