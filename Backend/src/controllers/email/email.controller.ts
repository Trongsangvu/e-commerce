import { sendEmail } from "../../utils/email/sendEmail";
import { Request, Response, NextFunction } from "express";

export const sendMessageByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { to, message } = req.body; // subject
        const result = await sendEmail(to, message); // subject

        res.status(200).json({ success: true, data: result });
    }
    catch(error) {
        next(error);
    }
}