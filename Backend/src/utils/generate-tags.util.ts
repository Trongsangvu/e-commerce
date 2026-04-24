import { IProduct } from "../types/product-types";

// System-generated tags
export const generateSystemTags = (product: IProduct) => {
  const tags: string[] = [];

  const text = `${product.name} ${product.description}`.toLowerCase();

  // category-based
  if (product.category === "shoes") tags.push("footwear");
  if (product.category === "watch") tags.push("accessory");

  // price-based
  if (product.price >= 200) tags.push("premium");
  if (product.price <= 50) tags.push("budget");

  // text-based
  if (text.includes("leather")) tags.push("leather");
  if (text.includes("cotton")) tags.push("cotton");
  if (text.includes("waterproof")) tags.push("waterproof");

  return tags;
};

// AI-generated tags
export const generateAITags = (product: IProduct) => {
  const text = `${product.name} ${product.description}`.toLowerCase();

  const tags: string[] = [];

  if (text.includes("nike")) tags.push("sportswear");
  if (text.includes("air force")) tags.push("sneakers");
  if (text.includes("oversize")) tags.push("streetwear");

  return tags;
};

// Admin-defined tags are passed directly
export const mergeTags = (
  systemTags: string[],
  aiTags: string[],
  adminTags: string[],
) => {
  return Array.from(new Set([...systemTags, ...aiTags, ...adminTags]));
};
