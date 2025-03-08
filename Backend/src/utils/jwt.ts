import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JwtPayload } from 'jsonwebtoken';

dotenv.config();

export const validateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header("authorization");
    if(!token) {
        res.status(401).json({ message: "Access denied. "});
        return;
    }

    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        const validated = jwt.verify(token.replace("Bearer ", ""), jwtSecret);
        req.user = validated as JwtPayload;
        next();
    }
    catch(error) {
        res.status(403).json({ message: "Invalid Token" });
    }
}