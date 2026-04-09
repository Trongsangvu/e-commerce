import z from "zod";
import { messageInvalid } from "../configs/messages";
import { isValidObjectId } from "../utils/validate.util";

export const objectIdSchema = z.string().refine((val) => isValidObjectId(val), {
  message: messageInvalid("ObjectId"),
});
