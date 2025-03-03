import express from 'express';
import { stripeWebhook } from '../webhooks/stripe.webhook';
import { paypalWebhook } from '../webhooks/paypal.webhook';

const router = express.Router();


router.post('/stripe', stripeWebhook);
router.post('/paypal', paypalWebhook);

export default router;