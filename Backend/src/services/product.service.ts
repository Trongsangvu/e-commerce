import { Product } from "../models/Product";

const find = async () => {
  return await Product.find({});
};

const findById = async (id: string) => {
  return await Product.findById(id);
};

const create = async (data: any) => {
  return await Product.create(data);
};

const update = async (id: string, data: any) => {
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
};
