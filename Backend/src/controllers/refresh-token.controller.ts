import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/generate-access-token.util";
import { ApiResponse } from "../configs/response";
import { messageInvalid } from "../configs/messages";

export const refreshToken = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    console.log("Received Refresh Token:", req.cookies.refreshToken);
    // Get refresh token from cookies
    const refreshTokenFromCookie = req.cookies.refreshToken;
    if (!refreshTokenFromCookie) {
      res
        .status(401)
        .json({ message: "Access denied. No refresh token provided." });
      return;
    }

    if (typeof refreshTokenFromCookie !== "string") {
      ApiResponse.BadRequest(res, messageInvalid("refresh token"));
      return;
    }

    // Get refresh token secret from env
    const jwtRefreshSecret = Buffer.from(
      process.env.JWT_REFRESH_SECRET!,
      "base64",
    ).toString("utf8");
    if (!jwtRefreshSecret) {
      throw new Error("JWT_REFRESH_SECRET is not defined in env");
    }

    // Verify refresh token
    let decoded: jwt.JwtPayload;

    try {
      decoded = jwt.verify(
        refreshTokenFromCookie,
        jwtRefreshSecret,
      ) as jwt.JwtPayload;
    } catch {
      ApiResponse.Forbidden(res, messageInvalid("refresh token"));
      return;
    }

    // Generate new access token
    const accessToken = generateAccessToken({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });

    res.json({ accessToken });
  } catch {
    ApiResponse.Forbidden(res, messageInvalid("refresh token"));
  }
};
