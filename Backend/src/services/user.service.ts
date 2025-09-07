import bcrypt from "bcryptjs";
import { User } from "../models/User";

const findOneByEmail = async (email: string) => {
  return await User.findOne({ email });
};

const findById = async (id: string) => {
  return await User.findById(id).select("-password");
};

const getUser = async () => {
  return await User.find().select("-password");
};

const createUser = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  return await newUser.save();
};

const createOAuthUser = async (
  name: string,
  email: string,
  appwriteId: string
) => {
  const newUser = new User({ name, email, appwriteId, role: "user" });
  return await newUser.save();
};

export default {
  findOneByEmail,
  findById,
  getUser,
  createUser,
  createOAuthUser,
};
