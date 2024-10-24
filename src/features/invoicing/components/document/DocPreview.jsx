import React from "react";
import Pages from "./Page";

const DocPreview = ({ data }) => {
  return (
    <div className="flex gap-2 justify-center lg:justify-start flex-wrap">
      <Pages data={data} />
    </div>
  );
};

export default DocPreview;
