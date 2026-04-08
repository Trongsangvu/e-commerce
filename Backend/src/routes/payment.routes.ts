import express from "express";
import { checkoutPayment, getStatus } from "../controllers/payment.controller";

const router = express.Router();

router.post("/checkout", checkoutPayment);
router.get("/:id/status", getStatus);

export default router;
