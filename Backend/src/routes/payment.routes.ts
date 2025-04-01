import express from 'express';
import { checkoutPayment, getStatus } from '../controllers/payment/payment.controller';
import { validateToken } from '../utils/validation/jwt';

const router = express.Router();

router.post('/checkout', validateToken, checkoutPayment);
router.get('/:orderId/status', validateToken, getStatus);

export default router;