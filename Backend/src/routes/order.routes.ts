import express from "express";
import { validateToken } from "../utils/jwt.util";
import {
  createOrders,
  getOrders,
  updateOrders,
  updateOrderStatus,
} from "../controllers/order.controller";

const router = express.Router();

router.get("/", validateToken, getOrders);
router.post("/create", validateToken, createOrders);
router.put("/:id/status", validateToken, updateOrderStatus);
router.put("/:id", validateToken, updateOrders);

export default router;
