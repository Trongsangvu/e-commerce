import { User, UserDocument } from "../models/user.model";
import { IUser } from "../types/user-types";

const save = async (user: UserDocument): Promise<UserDocument> => {
  return await user.save();
};

const findOneByEmail = async (email: string) => {
  return await User.findOne({ email });
};

const findById = async (id: string) => {
  return await User.findById(id).select("-password");
};

const findByIdForAuth = async (id: string) => {
  return await User.findById(id).select("+password");
};

const findByEmailForAuth = async (email: string) => {
  return await User.findOne({ email }).select("+password");
};

const getUser = async () => {
  return await User.find().select("-password");
};

const create = async (data: IUser): Promise<UserDocument> => {
  const newUser = new User(data);
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

const list = async (
  query = {},
  skip: number,
  limit: number,
): Promise<{ users: IUser[]; count: number }> => {
  const [users, count] = await Promise.all([
    User
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort("-created_at")
      .lean(),
    User.countDocuments(query),
  ]);
  return { users, count };
};

export default {
  save,
  findOneByEmail,
  findById,
  findByIdForAuth,
  findByEmailForAuth,
  getUser,
  create,
  createOAuthUser,
  list,
};
