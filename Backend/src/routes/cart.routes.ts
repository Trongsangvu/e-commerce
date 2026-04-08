import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCart,
} from "../controllers/cart.controller";

const router = express.Router();

router.get("/", getCart);
router.post("/add", addToCart);
router.put("/update/:id", updateCart);
router.patch("/update/:id", updateCart);
router.delete("/:id", removeFromCart);

export default router;
