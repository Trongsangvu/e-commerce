import express from 'express';
import { checkoutPayment } from '../controllers/payment/payment.controller';
import { stripeWebhook } from '../webhooks/stripe.webhook';
import { paypalWebhook } from '../webhooks/paypal.webhook';

const router = express.Router();

router.post('/checkout', checkoutPayment);
router.post('/webhook/stripe', stripeWebhook);
router.post('/webhook/paypal', paypalWebhook);

export default router;