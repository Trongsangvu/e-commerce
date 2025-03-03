import express from 'express';
import { checkoutPayment } from '../controllers/payment/payment.controller';
import { validateToken } from '../utils/jwt';


const router = express.Router();


router.post('/checkout', validateToken, checkoutPayment);

export default router;