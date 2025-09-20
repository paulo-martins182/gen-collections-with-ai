import React from "react";
import FormInput from "../_components/FormInput";
import PreviewTemplate from "../_components/PreviewTemplate";

export default function ProductImage() {
  return (
    <div>
      <h2 className="font-bold text-2xl mb-3">AI Product Image Generator</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <FormInput />
        </div>
        <div className="md:grid-cols-2">
          <PreviewTemplate />
        </div>
      </div>
    </div>
  );
}
