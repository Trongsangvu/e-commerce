import { Request, Response } from "express";
import { CONSTANTS } from "../configs/constants";
import { messageExisted, messageUser } from "../configs/messages";
import { UserRole } from "../configs/enum";
import { ApiResponse } from "../configs/response";
import { User } from "../models/user.model";
import userService from "../services/user.service";
import { hashPassword, verifyPassword } from "../utils/hash.util";
import {
  createJwtCookie,
  createRefreshToken,
  jwtEncode,
} from "../utils/jwt.util";

// Login user
const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await userService.findByEmailForAuth(email);
    if (!user) {
      ApiResponse.NotFound(res, messageUser.USER_LOGIN_FAILED);
      return;
    }

    // Check password
    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      ApiResponse.BadRequest(res, messageUser.USER_LOGIN_FAILED);
      return;
    }

    user.password = undefined as any;
    user.salt = undefined as any;

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
    };

    // Generate tokens
    const token = jwtEncode(
      payload,
      CONSTANTS.JWT_SECRET_KEY as string,
      CONSTANTS.JWT_EXPIRES_SIGNIN as any,
    );

    const refreshToken = createRefreshToken(payload);

    // Set refresh token in cookie
    const cookieConfig = createJwtCookie(refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.cookie(cookieConfig.name, cookieConfig.value, cookieConfig.options);

    ApiResponse.OK(res, {
      user,
      token,
    });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

// Logout user
const logout = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Clear both tokens from cookies
    res.clearCookie("token", {
      path: "/",
      sameSite: "strict",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
    });

    ApiResponse.OK(res, messageUser.USER_LOGOUT_SUCCESS);
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

// Register user
const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check email has been existed yet
    const existingUser = await userService.findOneByEmail(email);
    if (existingUser) {
      ApiResponse.BadRequest(res, messageExisted("Email"));
      return;
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const userResult = await userService.create({
      name,
      email,
      password: hashedPassword,
      role: UserRole.USER,
    } as any);

    // remove sensitive fields
    userResult.password = undefined as any;
    userResult.salt = undefined as any;

    ApiResponse.Created(res, {
      user: userResult,
      message: messageUser.USER_REGISTER_SUCCESS,
    });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

const oauthLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, $id: appWriteId } = req.body;

    if (!email || !appWriteId) {
      ApiResponse.BadRequest(res, messageUser.OAUTH_MISSING_DATA);
      return;
    }

    // Check if user exists in DB
    let user = await userService.findOneByEmail(email);

    if (!user) {
      // Create new user if not exists
      user = await User.create({
        email,
        name,
        appWriteId,
        role: "user",
      });
    } else if (!user.appWriteId) {
      // Update appWriteId, if user created manual before
      user.appWriteId = appWriteId;
      await user.save();
    }

    // Generate tokens
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
    };

    const token = jwtEncode(
      payload,
      process.env.JWT_SECRET as string,
      CONSTANTS.JWT_EXPIRES_SIGNIN as any,
    );

    const refreshToken = createRefreshToken(payload);

    // Set refresh token in cookie
    const cookieConfig = createJwtCookie(refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.cookie(cookieConfig.name, cookieConfig.value, cookieConfig.options);

    ApiResponse.OK(res, {
      user,
      token,
    });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

export default {
  login,
  logout,
  register,
  oauthLogin,
};
