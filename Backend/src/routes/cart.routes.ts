import express from "express";
import { validateToken } from "../utils/validation/jwt";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCart,
} from "../controllers/cart/cart.controller";

const router = express.Router();

router.get("/", validateToken, getCart);
router.post("/add", validateToken, addToCart);
router.put("/update/:productId", validateToken, updateCart);
router.patch("/update/:productId", validateToken, updateCart);
router.delete("/:productId", validateToken, removeFromCart);

export default router;
