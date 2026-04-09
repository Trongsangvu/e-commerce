import { Types } from "mongoose";

// Utility function to validate ObjectId
export const isValidObjectId = (id?: string): boolean => {
  if (!id) return false;

  return Types.ObjectId.isValid(id) && new Types.ObjectId(id).toString() === id;
};
