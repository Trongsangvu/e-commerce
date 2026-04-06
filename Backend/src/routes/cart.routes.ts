import express from "express";
import { validateToken } from "../utils/jwt";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCart,
} from "../controllers/cart.controller";

const router = express.Router();

router.get("/", validateToken, getCart);
router.post("/add", validateToken, addToCart);
router.put("/update/:id", validateToken, updateCart);
router.patch("/update/:id", validateToken, updateCart);
router.delete("/:id", validateToken, removeFromCart);

export default router;
