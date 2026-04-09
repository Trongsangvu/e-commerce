import express from "express";
import cartController from "../controllers/cart.controller";
import { addToCartRequest, removeFromCartRequest } from "../requests/cart.request";
import { allTokenRequired } from "./../middlewares/auth.middleware";
import { validateRequest } from "./../middlewares/validate.middleware";

const router = express.Router();

router.get("/", allTokenRequired, cartController.getCart);

router.post(
  "/add",
  allTokenRequired,
  validateRequest(addToCartRequest),
  cartController.addToCart,
);

router.put(
  "/:id",
  allTokenRequired,
  validateRequest(addToCartRequest),
  cartController.updateCart,
);

router.delete(
  "/:id",
  allTokenRequired,
  validateRequest(removeFromCartRequest),
  cartController.removeFromCart,
);

export default router;
