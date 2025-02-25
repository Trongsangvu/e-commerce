import express from "express";
import { validateToken } from '../utils/jwt';
import { getCart, addToCart } from "../controllers/cart/cart.controller";

const router = express.Router();

router.get('/', validateToken, getCart);
router.post('/add', validateToken, addToCart);

export default router;