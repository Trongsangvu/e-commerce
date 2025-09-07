import { Order } from "../models/Order";

const findById = async (id: string) => {
  return await Order.findById(id)
    .select("products totalAmount status createdAt")
    .sort({ createdAt: -1 });
};

const updateById = async (id: string, body: Partial<typeof Order>) => {
  return await Order.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
};

const updateStatus = async (id: string, status: string) => {
  return await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );
};

export default {
  findById,
  updateById,
  updateStatus,
};
