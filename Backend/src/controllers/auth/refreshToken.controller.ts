import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { generateAccessToken } from '../../utils/generateAccessToken';

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Received Refresh Token:", req.cookies.refreshToken);
        const refreshTokenFromCookie = req.cookies.refreshToken;
        if (!refreshTokenFromCookie) {
            res.status(401).json({ message: "Access denied. No refresh token provided." });
            return;
        }

        if (typeof refreshTokenFromCookie !== "string") {
            res.status(400).json({ message: "Invalid refresh token format" });
            return;
        }

        const jwtRefreshSecret = Buffer.from(process.env.JWT_REFRESH_SECRET!, "base64").toString("utf8");
        if (!jwtRefreshSecret) {
            throw new Error("JWT_REFRESH_SECRET is not defined in env");
        }

        // Verify refresh token
        let decoded: jwt.JwtPayload;

        try {
            decoded = jwt.verify(refreshTokenFromCookie, jwtRefreshSecret) as jwt.JwtPayload;
            console.log("Decoded Refresh Token:", decoded);
        } catch (error) {
            console.error("Error verifying refresh token:", error);
            res.status(403).json({ message: "Invalid refresh token" });
            return;
        }

        // Generate new access token
        const accessToken = generateAccessToken({ id: decoded.id, email: decoded.email, role: decoded.role });
        console.log("Generated Access Token:", accessToken);

        res.json({ accessToken });
    } catch (error) {
        console.error("Error refreshing token:", error);
        res.status(403).json({ message: 'Invalid refresh token' });
    }
};