import express from "express";
import {
  login,
  logout,
  oauthLogin,
  register,
} from "../controllers/auth.controller";
import { protectedRoute } from "../controllers/protect.controller";
import { refreshToken } from "../controllers/refresh-token.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/oauth/appwrite-login", oauthLogin);
router.post("/refresh-token", refreshToken);
router.get("/protected-route", protectedRoute);

export default router;
