import { Request, Response } from "express";
import { ApiResponse } from "../configs/response";
import { sendEmail } from "../utils/email.util";

export const sendMessageByEmail = async (req: Request, res: Response) => {
  try {
    const { to, message } = req.body; // subject
    const result = await sendEmail(to, message); // subject

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};
