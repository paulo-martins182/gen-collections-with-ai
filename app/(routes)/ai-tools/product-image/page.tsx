"use client";
import React, { useState } from "react";
import FormInput from "../_components/FormInput";
import PreviewTemplate from "../_components/PreviewTemplate";
import { FormDataTypes, InputChangeHandler } from "@/app/_types/creation-types";
import axios from "axios";

export default function ProductImage() {
  const [formData, setFormData] = useState<FormDataTypes>({} as FormDataTypes);
  const [loading, setLoading] = useState(false);
  const onChangeInput: InputChangeHandler = (field, value) => {
    console.log("oninput", value, field);
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onGenerateImage = async () => {
    if (!formData.file && formData?.imageUrl) {
      alert("Please select a file or a sample image");
      return;
    }

    /*    if (formData.description || formData?.size) {
        alert("Please enter all fields");
        return;
      } */

    setLoading(true);
    const formData_ = new FormData();
    formData_.append("file", formData.file as Blob);
    formData_.append("description", formData.description ?? "");
    formData_.append("size", formData.size ?? "1024x1024");
    formData_.append("imageUrl", formData.imageUrl);

    const result = await axios.post("/api/generate-product/image", formData_);
    console.log(formData_, "form");

    console.log("result", result);
    setLoading(false);
  };

  return (
    <div>
      <h2 className="font-bold text-2xl mb-3">AI Product Image Generator</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <FormInput
            onHandleInputChange={(value, field) => {
              console.log("gg", value, field);
              onChangeInput(value, field);
            }}
            onGenerateImage={onGenerateImage}
            loading={loading}
          />
        </div>
        <div className="md:grid-cols-2">
          <PreviewTemplate />
        </div>
      </div>
    </div>
  );
}
