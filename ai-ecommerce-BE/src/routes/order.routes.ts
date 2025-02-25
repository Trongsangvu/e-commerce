import express from 'express';
import { validateToken } from '../utils/jwt';
import { createOrders, getOrders } from '../controllers/order/order.controller';

const router = express.Router();

router.get('/', validateToken, getOrders);
router.post('/create', validateToken, createOrders);

export default router;