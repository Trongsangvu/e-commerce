import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import { CONSTANTS } from "../configs/constants";

interface TokenPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
}

type CookieOptions = {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  maxAge?: number;
};

const jwtSign = (
  data: string | object | Buffer,
  secret: Secret,
  expires: SignOptions["expiresIn"],
): string => {
  return jwt.sign(data, secret, { expiresIn: expires });
};

// Function to encode data into a two-layered JWT
export const jwtEncode = (
  data: object | string,
  secret: Secret,
  expires: SignOptions["expiresIn"],
): string => {
  // 1. First JWT
  const firstToken = jwtSign(data, secret, expires);
  const [header, payload, signature] = firstToken.split(".");

  // 2. Second Level: Swap payload/header and use signature as secret
  const secondSecret = signature;
  const secondData = `${payload}.${header}`;

  // 3. Second JWT
  const secondToken = jwtSign({ data: secondData }, secondSecret, expires);

  // 4. Return combined string: signature.header.payload.signature
  return `${secondSecret}.${secondToken}`;
};

// Utility function to decode a two-layered JWT
export const jwtDecode = (
  token: string,
  secret: Secret,
): JwtPayload | string | null => {
  try {
    // The token format is: [original_signature].[header2].[payload2].[signature2]
    const parts = token.split(".");
    if (parts.length !== 4) return null;

    const [firstSignature, h2, p2, s2] = parts;

    // 1. Verify the outer layer using the first signature as the secret
    const secondTokenEncoded = `${h2}.${p2}.${s2}`;
    const secondDecoded = jwt.verify(
      secondTokenEncoded,
      firstSignature,
    ) as JwtPayload;

    // 2. Reconstruct the inner layer
    const [payload, header] = secondDecoded.data.split(".");
    const firstTokenEncoded = `${header}.${payload}.${firstSignature}`;

    // 3. Verify inner layer with original secret
    return jwt.verify(firstTokenEncoded, secret) as JwtPayload | string;
  } catch {
    return null;
  }
};

// Utility function to create a cookie object for JWT
export const createJwtCookie = (
  token: string,
  options: CookieOptions = {},
): { name: string; value: string; options: CookieOptions } => {
  return {
    name: "token",
    value: token,
    options: {
      httpOnly: options.httpOnly ?? true,
      secure: options.secure ?? process.env.NODE_ENV === "production",
      sameSite: options.sameSite ?? "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // Default to 7 days
    },
  };
};

// Utility function to create a refresh token
export const createRefreshToken = (payload: TokenPayload): string => {
  return jwtEncode(
    payload,
    CONSTANTS.JWT_REFRESH_SECRET_KEY as Secret,
    CONSTANTS.AUTH_REFRESH_TOKEN_EXPIRY as SignOptions["expiresIn"],
  );
};
