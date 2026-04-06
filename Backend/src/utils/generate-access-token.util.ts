import ms from "ms";
import jwt from "jsonwebtoken";

const rawExpire = process.env.AUTH_ACCESS_TOKEN_EXPIRY || "48h";

if (!ms(rawExpire as ms.StringValue)) {
  throw new Error("Invalid AUTH_ACCESS_TOKEN_EXPIRY value");
}

const accTokenExpire = rawExpire as jwt.SignOptions["expiresIn"];

// Generate Access Token
export const generateAccessToken = (user: object) => {
  const jwtSecret = process.env.JWT_SECRET as jwt.Secret;
  if (!jwtSecret) throw new Error("JWT_SECRET is not defined in env variables");

  const options: jwt.SignOptions = { expiresIn: accTokenExpire };

  return jwt.sign(user, jwtSecret, options);
};
