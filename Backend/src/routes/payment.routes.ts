import express from "express";
import {
  checkoutPayment,
  getStatus,
} from "../controllers/payment.controller";
import { validateToken } from "../utils/jwt";

const router = express.Router();

router.post("/checkout", validateToken, checkoutPayment);
router.get("/:id/status", validateToken, getStatus);

export default router;
