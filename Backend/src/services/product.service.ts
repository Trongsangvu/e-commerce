import { Product, ProductDocument } from "../models/product.model";
import { IProduct } from "../types/product-types";

const find = async () => {
  return await Product.find({});
};

const findById = async (id: string) => {
  return await Product.findById(id);
};

const list = async (
  query = {},
  skip: number,
  limit: number,
): Promise<{ products: IProduct[]; count: number }> => {
  const [products, count] = await Promise.all([
    Product
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort("-created_at")
      .lean(),
    Product.countDocuments(query),
  ]);
  return { products, count };
};

const create = async (data: IProduct): Promise<ProductDocument> => {
  const product = new Product(data);
  return await product.save();
};

const update = async (id: string, data: IProduct): Promise<ProductDocument | null> => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

const remove = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};

const search = async (keyword: string) => {
  return await Product.find({
    name: { $regex: keyword, $options: "i" },
  });
};

export default {
  find,
  findById,
  create,
  update,
  remove,
  search,
  list,
};
