import express from "express";
import { validateToken } from '../utils/validation/jwt';
import { getCart, addToCart, removeFromCart } from "../controllers/cart/cart.controller";

const router = express.Router();

router.get('/', validateToken, getCart);
router.post('/add', validateToken, addToCart);
router.delete('/:productId', validateToken, removeFromCart);

export default router;