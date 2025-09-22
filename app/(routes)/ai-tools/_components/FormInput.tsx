"use client";
import React, { useState } from "react";
import Image from "next/image";

import {
  ImagePlusIcon,
  Loader2Icon,
  RectangleHorizontal,
  RectangleVertical,
  Sparkle,
  Square,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { InputChangeHandler } from "@/app/_types/creation-types";

const sampleProduct = [
  "/headphone.png",
  "/perfume.png",
  "/juice-can.png",
  "/burger.png",
  "/ice-creame.png",
];

const SelectOptions = [
  { label: "1:1", value: "1024x1024", icon: <Square className="h-4 w-4" /> },
  {
    label: "16:9",
    value: "1024x1536",
    icon: <RectangleVertical className="h-4 w-4" />,
  },
  {
    label: "9:16",
    value: "1536x1024",
    icon: <RectangleHorizontal className="h-4 w-4" />,
  },
];

type FormInputProps = {
  onHandleInputChange?: InputChangeHandler;
  onGenerateImage?: () => void;
  loading: boolean;
};

export default function FormInput({
  onHandleInputChange = () => null,
  onGenerateImage = () => null,
  loading,
}: FormInputProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const onFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB");
      return;
    }

    onHandleInputChange("file", file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <div>
        <h2 className="font-semibold ">Upload Product Image</h2>
        <div>
          <label
            htmlFor="inputImage"
            className="mt-2 border-dashed border-2 rounded-xl flex flex-col p-4 items-center justify-center min-h-[200px] cursor-pointer"
          >
            {preview ? (
              <Image
                src={preview}
                alt="Preview Image"
                width={300}
                height={300}
                className="w-full h-full  max-h-[200px] object-contain rounded"
              />
            ) : (
              <div className="flex flex-col items-center gap-2  ">
                <ImagePlusIcon className="h-8 w-8 opacity-40" />
                <span className="text-xl">Click Here to upload image</span>
                <p className="opacity-45">upload image upto 5MB</p>
              </div>
            )}
          </label>
          <input
            type="file"
            id="inputImage"
            className="hidden"
            accept="images"
            onChange={(e) => onFileSelect(e.target.files)}
          />
        </div>

        <h2 className="opacity-45 text-center mt-5 mb-3">
          Sample Product to try
        </h2>
        <div className="flex gap-5 items-center">
          {sampleProduct.map((item) => (
            <Image
              src={item}
              key={item}
              alt={item}
              width={100}
              height={100}
              className="w-[60px] h-[60px] rounded-lg cursor-pointer hover:scale-105 transition-transform object-contain"
              onClick={() => {
                setPreview(item);
                onHandleInputChange("imageUrl", item);
              }}
            />
          ))}
        </div>

        <div className="mt-8">
          <h2 className="font-semibold ">Enter product description</h2>

          <Textarea
            placeholder="tell me more about product and how you want to display"
            className="min-h-[150px] mt-5"
            onChange={(e) => onHandleInputChange("description", e.target.value)}
          />
        </div>

        <div className="mt-8">
          <h2 className="font-semibold ">Select image size</h2>

          <Select onValueChange={(value) => onHandleInputChange("size", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select resolution" />
            </SelectTrigger>
            <SelectContent>
              {SelectOptions.map((option) => (
                <SelectItem value={option.value} key={option.value}>
                  <div className="flex items-center gap-2">
                    {!!option.icon && option.icon}
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2 text-center">
        <Button
          className="w-full mt-8"
          onClick={onGenerateImage}
          disabled={loading}
        >
          {loading ? <Loader2Icon className="animate-spin" /> : <Sparkle />}{" "}
          Generate
        </Button>
        <span className="opacity-35 text-sm">10 credits to generate</span>
      </div>
    </div>
  );
}
