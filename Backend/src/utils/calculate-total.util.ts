import { Product } from "../models/product.model";

export const calculateTotalAmount = async (
  products: { productId: string; quantity: number }[],
) => {
  let total = 0;
  for (const item of products) {
    const product = await Product.findById(item.productId);
    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }

    total += product.price * item.quantity;
  }
  return total;
};
