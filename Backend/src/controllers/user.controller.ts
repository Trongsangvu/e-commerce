import { Request, Response } from "express";
import { messageExisted, messageNotFound } from "../configs/messages";
import { ApiResponse } from "../configs/response";
import userService from "../services/user.service";
import { hashPassword } from "./../utils/hash.util";

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user;
    const userData = req.validatedBody;

    // Check user exists
    const existingUser = await userService.findOneByEmail(userData.email);
    if (existingUser) {
      ApiResponse.BadRequest(res, messageExisted("Email"));
      return;
    }

    const hashedPass = await hashPassword(userData.password);

    userData.password = hashedPass;
    userData.created_by = user.id;

    const userResult = await userService.create(userData);

    ApiResponse.Created(res, userResult);
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getUser();
    ApiResponse.OK(res, users);
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

const list = async (req: Request, res: Response): Promise<void> => {
  try {
    // const user = req.user;
    let query = {};

    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "10", 10);
    const skip = (page - 1) * limit;

    const { users, count } = await userService.list(query, skip, limit);

    ApiResponse.OK(res, { users, count });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

const getProfileUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.findById(req.user?.id);
    if (!user) {
      ApiResponse.NotFound(res, messageNotFound("User"));
      return;
    }

    ApiResponse.OK(res, user);
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.targetUser;
    const userData = req.validatedBody;

    if (userData.email && userData.email !== user.email) {
      // Check email has been existed yet
      const existingUser = await userService.findOneByEmail(userData.email);
      if (existingUser) {
        ApiResponse.BadRequest(res, messageExisted("Email"));
        return;
      }
    }

    const updatedUser = await userService.save(userData);

    ApiResponse.OK(res, updatedUser);
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

export default {
  create,
  getUsers,
  getProfileUser,
  update,
  list,
};
