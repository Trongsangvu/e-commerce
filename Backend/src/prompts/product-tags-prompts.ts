export const PRODUCT_TAG_PROMPT = (input: {
  name: string;
  description?: string;
  category?: string;
}) => `
You are an expert e-commerce product tagging system.

Task:
Generate relevant product tags for the product.

Rules:
- Return ONLY JSON array of strings
- Max 10 tags
- No explanations
- Tags must be lowercase
- Focus on: material, style, usage, category, trend

Product:
Name: ${input.name}
Description: ${input.description || ""}
Category: ${input.category || ""}

Output format:
["tag1", "tag2", "tag3"]
`;
