import { Request, Response } from 'express';
import stripe from '../config/payment/stripe';
import { Order } from '../models/Order';

export const stripeWebhook = async (req: Request, res: Response): Promise<void> => {
    const sig = req.headers['stripe-signature'];

    try {
        const event = stripe.webhooks.constructEvent(req.body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);

        if(event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;
            await Order.findOneAndUpdate({ stripePaymentId: paymentIntent.id }, { status: 'paid' });
        }

        res.json({ received: true });
    }
    catch(error) {
        res.status(400).send(`Webhook Error: ${error.message}`);
    }
}