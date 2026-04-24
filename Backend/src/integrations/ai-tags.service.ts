import { PRODUCT_TAG_PROMPT } from "../prompts/product-tags-prompts";
import { IProduct } from "../types/product-types";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAITags = async (product: IProduct) => {
  const prompt = PRODUCT_TAG_PROMPT({
    name: product.name,
    description: product.description,
    category: product.category,
  });

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a tagging assistant." },
      { role: "user", content: prompt },
    ],
  });

  return JSON.parse(res.choices[0].message.content || "[]");
};
