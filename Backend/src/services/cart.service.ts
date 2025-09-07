import { Cart } from "../models/Cart";

const findOne = async (userId: string) => {
  return await Cart.findOne({ userId }).populate("items.productId");
};

const update = async (userId: string, productId: string, quantity: number) => {
  return await Cart.findOneAndUpdate(
    { userId, "items.productId": productId },
    { $set: { "items.$.quantity": quantity } },
    { new: true }
  ).populate("items.productId");
};

const remove = async (userId: string, productId: string) => {
  return await Cart.findOneAndUpdate(
    { userId },
    { $pull: { items: { productId } } },
    { new: true }
  ).populate("items.productId");
};

export default {
  findOne,
  update,
  remove,
};
