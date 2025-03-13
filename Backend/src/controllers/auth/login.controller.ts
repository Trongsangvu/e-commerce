import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import ms from "ms";
import { User } from '../../models/User';


const accTokenExpire = ms(process.env.AUTH_ACCESS_TOKEN_EXPIRY as ms.StringValue || '15m');
const refreshTokenExpire = ms(process.env.AUTH_REFRESH_TOKEN_EXPIRY as ms.StringValue || '1d');

export const generateAccessToken = (user: any) => {
    const jwtSecret = process.env.JWT_SECRET;
    if(!jwtSecret) throw new Error("JWT_SECRET is not defined in env variables");

    return jwt.sign(user, jwtSecret, { expiresIn: accTokenExpire });
}

const generateRefreshToken = (user: any) => {
    const jwtRefreshToken = process.env.JWT_REFRESH_SECRET;
    if(!jwtRefreshToken) throw new Error("JWT_REFRESH_SECRET is not defined in env variables");

    return jwt.sign(user, jwtRefreshToken, { expiresIn: refreshTokenExpire })
}

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

        // Generate tokens
        const accessToken = generateAccessToken({ id: user._id, email: user.email, role: user.role });
        const refreshToken = generateRefreshToken({ id: user._id, email: user.email, role: user.role });

        console.log(jwt.decode(refreshToken));
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: "strict" });
        res.json({ accessToken, user: { id: user._id, email: user.email, role: user.role }});
    }
    catch(error) {
        next(error);
    }
}
