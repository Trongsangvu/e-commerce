import express from "express";
import authController from "../controllers/auth.controller";
import { protectedRoute } from "../controllers/protect.controller";
import { refreshToken } from "../controllers/refresh-token.controller";
import { validateRequest } from "../middlewares/validate.middleware";
import {
  userLoginRequest,
  userRegisterRequest,
} from "../requests/user.request";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userRegisterRequest),
  authController.register,
);

router.post(
  "/login",
  validateRequest(userLoginRequest),
  authController.login
);

router.post("/logout", authController.logout);

router.post("/oauth/appwrite-login", authController.oauthLogin);

router.post("/refresh-token", refreshToken);

router.get("/protected-route", protectedRoute);

export default router;
