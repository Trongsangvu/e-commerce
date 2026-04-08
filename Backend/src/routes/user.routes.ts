import express from "express";
import userController from "../controllers/user.controller";
import {
  adminTokenRequired,
  allTokenRequired,
} from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validate.middleware";
import { userCreateRequest } from "../requests/user.request";

const router = express.Router();

router.post(
  "/",
  adminTokenRequired,
  validateRequest(userCreateRequest),
  userController.create,
);

router.get("/", allTokenRequired, userController.getUsers);

router.get("/profile", allTokenRequired, userController.getProfileUser);

export default router;
