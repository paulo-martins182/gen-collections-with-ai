import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AiTools = [
  {
    name: "AI Products Image",
    description:
      "Generate product images high quality, professional product instantly with AI.",
    bannerSrc: "/product-image.png",
    link: "/ai-tools/product-image",
  },
  {
    name: "AI Products Video",
    description:
      "Generate Engaging product showcase video to boost sales with AI",
    bannerSrc: "/product-video.png",
    link: "/",
  },
  {
    name: "AI Products Avatar",
    description:
      "Bring your product to life with AI-generated avatars to showcase your product in action.",
    bannerSrc: "/product-avatar.png",
    link: "/",
  },
];

export default function ToolsList() {
  return (
    <div>
      <h2 className="font-bold text-2xl mb-2">Ai Tools to create</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {AiTools.map((tool) => (
          <div
            key={tool.name}
            className="flex items-center justify-between p-7 bg-zinc-700 rounded-2xl"
          >
            <div>
              <h2 className="font-bold text-2xl">{tool.name}</h2>
              <p className="opacity-60 mt-2">{tool.description}</p>
              <Link href={tool.link}>
                <Button className="mt-4 "> Create Now </Button>
              </Link>
            </div>

            <Image
              src={tool.bannerSrc}
              alt={tool.name}
              width={300}
              height={300}
              className="w-[200px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
