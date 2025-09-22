import OpenAI from "openai";
export const clientOpenai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

/* const response = await client.responses.create({
  model: "gpt-5",
  input: "Write a short bedtime story about a unicorn.",
});

console.log(response.output_text);
 */
