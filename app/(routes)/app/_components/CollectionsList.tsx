"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";

export default function CollectionsList() {
  const [adsList, setAdsList] = useState([]);
  return (
    <div>
      <h2 className="font-bold text-2xl mb-2 mt-5">My Collections</h2>

      {adsList.length === 0 && (
        <div className="p-5 border-dashed border-2 rounded-xl flex flex-col items-center justify-center mt-6 gap-3">
          <Image
            src="/empty-ads.svg"
            alt="Empty ADS Icon"
            width={200}
            height={200}
            className="w-20"
          />
          <h2 className="text-xl">You don't have any ads created </h2>
          <Button>Create your first ads</Button>
        </div>
      )}
    </div>
  );
}
