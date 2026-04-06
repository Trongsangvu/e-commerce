import express from "express";

import authRoute from "./auth.routes";
import emailRoute from "./email.routes";
import orderRoute from "./order.routes";
import productRoute from "./product.routes";
import userRoute from "./user.routes";
import webhookRoute from "./webhook.routes";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/products", productRoute);
router.use("/orders", orderRoute);
router.use("/webhooks", webhookRoute);
router.use("/email", emailRoute);

export default router;
