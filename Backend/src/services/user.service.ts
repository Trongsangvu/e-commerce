import { User } from "../models/user.model";

const findOneByEmail = async (email: string) => {
  return await User.findOne({ email });
};

const findById = async (id: string) => {
  return await User.findById(id).select("-password");
};

const findByIdForAuth = async (id: string) => {
  return await User.findById(id).select("+password +salt");
};

const findByEmailForAuth = async (email: string) => {
  return await User.findOne({ email }).select("+password +salt");
};

const getUser = async () => {
  return await User.find().select("-password");
};

const create = async (name: string, email: string, password: string) => {
  const newUser = new User({ name, email, password });
  return await newUser.save();
};

const createOAuthUser = async (
  name: string,
  email: string,
  appWriteId: string,
) => {
  const newUser = new User({ name, email, appWriteId, role: "user" });
  return await newUser.save();
};

export default {
  findOneByEmail,
  findById,
  findByIdForAuth,
  findByEmailForAuth,
  getUser,
  create,
  createOAuthUser,
};
