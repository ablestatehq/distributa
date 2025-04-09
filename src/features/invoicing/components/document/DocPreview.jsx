import React from "react";
import Content from "./Content";
import { useInvoiceView } from "../../hooks";

const DocPreview = () => {
  const { invoice } = useInvoiceView();

  return (
    <div className="flex gap-2 justify-center lg:justify-start flex-wrap">
      <Content data={invoice} />
    </div>
  );
};

export default DocPreview;
