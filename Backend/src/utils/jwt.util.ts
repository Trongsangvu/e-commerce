import { NextFunction, Request, Response } from "express";
import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.header("authorization");
  const cookieToken = req.cookies?.token;

  // const token = req.header("authorization");
  const token = authHeader?.replace("Bearer ", "") || cookieToken;

  if (!token) {
    res.status(401).json({ message: "Access denied. " });
    return;
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const validated = jwt.verify(token, jwtSecret);
    req.user = validated as JwtPayload;
    next();
  } catch (error) {
    console.error("jwt error:", error);
    res.status(403).json({ message: "Invalid Token" });
  }
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
