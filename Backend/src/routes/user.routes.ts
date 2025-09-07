import express from "express";
import { getUsers, getProfileUser } from "../controllers/user/user.controller";
import { validateToken } from "../utils/validation/jwt";

const router = express.Router();

router.get("/", getUsers);
router.get("/profile", validateToken, getProfileUser);

export default router;
