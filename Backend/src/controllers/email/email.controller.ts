import { sendEmail } from "../../utils/email/sendEmail";
import { Request, Response, NextFunction } from "express";

export const sendMessageByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { to, subject, message } = req.body;
        const result = await sendEmail(to, subject, message);
        
        res.status(200).json({ success: true, data: result });
    }
    catch(error) {
        next(error);
    }
}