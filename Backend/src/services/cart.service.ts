import { Types } from "mongoose";
import { Cart } from "../models/cart.model";

const findOne = async (userId: string) => {
  return await Cart.findOne({ userId }).populate("items.product");
};

const add = async (userId: string, productId: string, quantity: number) => {
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId,
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ product: new Types.ObjectId(productId), quantity });
  }

  await cart.save();
  return await Cart.findById(cart.id).populate("items.product");
};

const update = async (userId: string, productId: string, quantity: number) => {
  return await Cart.findOneAndUpdate(
    { userId, "items.product": productId },
    { $set: { "items.$.quantity": quantity } },
    { new: true },
  ).populate("items.product");
};

const remove = async (userId: string, productId: string) => {
  return await Cart.findOneAndUpdate(
    { userId },
    { $pull: { items: { productId } } },
    { new: true },
  ).populate("items.product");
};

export default {
  findOne,
  add,
  update,
  remove,
};
