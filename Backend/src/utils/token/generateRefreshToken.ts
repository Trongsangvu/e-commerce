import ms from "ms";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

const refreshTokenExpire =
  (process.env.AUTH_REFRESH_TOKEN_EXPIRY as ms.StringValue) || "7d";

// Generate Refresh Token
export const generateRefreshToken = (user: TokenPayload) => {
  const jwtRefreshToken = process.env.JWT_REFRESH_SECRET as jwt.Secret;
  if (!jwtRefreshToken)
    throw new Error("JWT_REFRESH_SECRET is not defined in env variables");

  const options: jwt.SignOptions = { expiresIn: refreshTokenExpire };

  return jwt.sign(user, jwtRefreshToken, options);
};
