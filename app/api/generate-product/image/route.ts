import { imagekit } from "@/lib/imagekit";
import { clientOpenai } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";
import { imagePrompt } from "../_prompts/image-prompt";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const description = formData.get("description");
  const size = formData.get("size");
  const imageUrl = formData.get("imageUrl");

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer).toString("base64");

  const imageKitRef = await imagekit.upload({
    file: buffer,
    fileName: Date.now() + ".png",
    isPublished: true,
  });

  console.log(imageKitRef.url);

  // generate product image using AI (i think here im using openai, but i rly dont know what i use here, need learning more)

  const response = await clientOpenai.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: imagePrompt({ productName: "produto1" }),
          },
          {
            type: "input_image",
            image_url: imageKitRef.url,
            detail: "auto",
          },
        ],
      },
    ],
  });

  const TextOutput = response.output_text?.trim();

  console.log("response", response);
  console.log("TextOutput", TextOutput);

  let json = JSON.parse(TextOutput);
  console.log(json);

  const imageResponse = await clientOpenai.responses.create({
    model: "dall-e-3",
    max_output_tokens: 500,
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            //@ts-ignore
            text: json?.textTolmage ?? "",
          },
          {
            type: "input_image",
            image_url: imageKitRef.url,
            detail: "auto",
          },
        ],
      },
    ],
    tools: [
      {
        type: "image_generation",
      },
    ],
  });

  console.log("imageResponse", imageResponse.output);
  const imageData = imageResponse.output
    ?.filter((item) => item.type === "image_generation_call")
    .map((item) => item.result);

  const generatedImage = imageData[0];

  const uploadResult = await imagekit.upload({
    file: `data:image/png;base64,${generatedImage}`,
    fileName: `generated-${Date.now()}.png`,
    isPublished: true,
  });

  return NextResponse.json(uploadResult?.url || "", { status: 200 });
}
