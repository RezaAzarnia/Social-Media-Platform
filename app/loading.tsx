import React from "react";
import Spinner from "./_Components/Spinner";

export default function loading() {
  return (
    <div className="relative">
      <h1 className="text-4xl text-center mt-80">
        <Spinner />
      </h1>
    </div>
  );
}
