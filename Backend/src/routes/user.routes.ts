import express from "express";
import { getUsers, getProfileUser } from "../controllers/user.controller";
import { validateToken } from "../utils/jwt.util";

const router = express.Router();

router.get("/", getUsers);
router.get("/profile", validateToken, getProfileUser);

export default router;
