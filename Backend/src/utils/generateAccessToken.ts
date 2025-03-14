import ms from "ms";
import jwt from "jsonwebtoken";


const accTokenExpire = process.env.AUTH_ACCESS_TOKEN_EXPIRY as ms.StringValue || '48h';

// Generate Access Token
export const generateAccessToken = (user: Object) => {
    const jwtSecret = process.env.JWT_SECRET as jwt.Secret;
    if(!jwtSecret) throw new Error("JWT_SECRET is not defined in env variables");

    const options: jwt.SignOptions = { expiresIn: accTokenExpire };

    return jwt.sign(user, jwtSecret, options);
}
