import React, { forwardRef } from "react";

const SpinnerMini = forwardRef<HTMLDivElement, {}>(
  function SpinnerMini(_, ref) {
    return <div className="spinner-mini" ref={ref}></div>;
  }
);

export default SpinnerMini;
