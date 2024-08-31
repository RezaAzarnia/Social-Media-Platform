import React, { forwardRef, Ref } from "react";

const Spinner = forwardRef<HTMLDivElement, {}>(function Spinner(_, ref) {
  return <div className="spinner" ref={ref}></div>;
});

export default Spinner;
