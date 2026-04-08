import jwt from "jsonwebtoken";
import ms from "ms";
import { CONSTANTS } from './../configs/constants';

interface TokenPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
}

const refreshTokenExpire =
  (CONSTANTS.AUTH_REFRESH_TOKEN_EXPIRY as ms.StringValue) || "7d";

// Generate Refresh Token
export const generateRefreshToken = (user: TokenPayload) => {
  const jwtRefreshToken = CONSTANTS.JWT_REFRESH_SECRET_KEY as jwt.Secret;
  if (!jwtRefreshToken)
    throw new Error("JWT_REFRESH_SECRET is not defined in env variables");

  const options: jwt.SignOptions = { expiresIn: refreshTokenExpire };

  return jwt.sign(user, jwtRefreshToken, options);
};
