import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { messageExisted, messageUser } from "../configs/messages";
import { ApiResponse } from "../configs/response";
import { User } from "../models/user.model";
import userService from "../services/user.service";
import { generateAccessToken } from "../utils/generate-access-token.util";
import { generateRefreshToken } from "../utils/generate-refresh-token.util";

// Login user
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await userService.findByEmailForAuth(email);
    if (!user) {
      ApiResponse.NotFound(res, messageUser.USER_LOGIN_FAILED);
      return;
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      ApiResponse.BadRequest(res, messageUser.USER_LOGIN_FAILED);
      return;
    }

    const payload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role ?? "user",
    };

    // Generate tokens
    const token = generateAccessToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = generateRefreshToken(payload);

    // Set refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    // Return token and some basic user info
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

// Logout user
export const logout = async (_req: Request, res: Response): Promise<void> => {
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
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    // Check email has been existed yet
    const existingUser = await userService.findOneByEmail(email);
    if (existingUser) {
      ApiResponse.BadRequest(res, messageExisted("Email"));
      return;
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    ApiResponse.Created(res, messageUser.USER_REGISTER_SUCCESS);
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

export const oauthLogin = async (
  req: Request,
  res: Response,
): Promise<void> => {
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
    const token = generateAccessToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = generateRefreshToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role ?? "user",
    });

    // Set refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      // secure: process.env.NODE_ENV === 'production',
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Return token and some basic user info
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};
