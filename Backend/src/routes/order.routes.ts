import express from 'express';
import { validateToken } from '../utils/jwt';
import { createOrders, getOrders, updateOrders, updateOrderStatus } from '../controllers/order/order.controller';

const router = express.Router();

router.get('/', validateToken, getOrders);
router.post('/create', validateToken, createOrders);
router.put('/:id', validateToken, updateOrders);
router.put('/:id/status', validateToken, updateOrderStatus);

export default router;