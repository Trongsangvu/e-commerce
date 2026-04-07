import bcrypt from "bcrypt";
import crypto from "crypto";

/**
 * Generates a cryptographically strong random salt.
 * Note: bcrypt.hash handles salt generation automatically,
 * but this is useful if you need a manual salt for other encryption.
 */
export const generateRandomSalt = (bytes: number = 32): string => {
  return crypto.randomBytes(bytes).toString("hex");
};

/**
 * Hashes a plain text password using bcrypt.
 * @param password - The raw password from the user
 * @returns A promise that resolves to the hashed password string
 */
export const hashPassword = async (password: string, salt: string): Promise<string> => {
  const saltRounds = 10;
  const combined = salt + password;
  return await bcrypt.hash(combined, saltRounds);
};

/**
 * Verifies if a plain text password matches a stored hash.
 * @param password - The raw password to check
 * @param hash - The hashed password from the database
 * @returns A promise that resolves to true if they match
 */
export const verifyPassword = async (
  password: string,
  hash: string,
  salt: string,
): Promise<boolean> => {
  const combined = salt + password;
  return await bcrypt.compare(password, hash);
};
