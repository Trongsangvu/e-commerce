import express from "express";
import {
  createOrders,
  getOrders,
  updateOrders,
  updateOrderStatus,
} from "../controllers/order.controller";

const router = express.Router();

router.get("/", getOrders);
router.post("/create", createOrders);
router.put("/:id/status", updateOrderStatus);
router.put("/:id", updateOrders);

export default router;
