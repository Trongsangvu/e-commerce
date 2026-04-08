import jwt from "jsonwebtoken";
import ms from "ms";
import { CONSTANTS } from './../configs/constants';

const rawExpire = CONSTANTS.AUTH_ACCESS_TOKEN_EXPIRY || "48h";

if (!ms(rawExpire as ms.StringValue)) {
  throw new Error("Invalid AUTH_ACCESS_TOKEN_EXPIRY value");
}

const accTokenExpire = rawExpire as jwt.SignOptions["expiresIn"];

// Generate Access Token
export const generateAccessToken = (user: object) => {
  const jwtSecret = CONSTANTS.JWT_SECRET_KEY as jwt.Secret;
  if (!jwtSecret) throw new Error("JWT_SECRET is not defined in env variables");

  const options: jwt.SignOptions = { expiresIn: accTokenExpire };

  return jwt.sign(user, jwtSecret, options);
};
