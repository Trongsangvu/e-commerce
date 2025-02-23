import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from '../../models/User';

dotenv.config();
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }

        // Check password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) {
            res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate token
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            jwtSecret,
            { expiresIn: "1d" }
        );

        res.json({ token, user: { id: user._id, email: user.email, role: user.role }});
    }
    catch(error) {
        next(error);
    }
}
