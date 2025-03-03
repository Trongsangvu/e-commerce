import { Request, Response } from 'express';
import stripe from '../config/payment/stripe';
import { Order } from '../models/Order';

export const stripeWebhook = async (req: Request, res: Response): Promise<void> => {
    const sig = req.headers['stripe-signature'];
    
    if(!sig) {
        res.status(400).send("Webhook Error: No stripe-signature header value was provided.");
        return;
    }
    
    const webhookSeret = process.env.STRIPE_WEBHOOK_SECRET!;
    try {
        const event = stripe.webhooks.constructEvent(req.body, sig!, webhookSeret);

        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;
            console.log("🛠 Received paymentIntent ID:", paymentIntent.id);
            console.log("📦 Metadata received:", paymentIntent.metadata);
            console.log("✅ PaymentIntent Status:", paymentIntent.status);
        
            const orderId = paymentIntent.metadata?.orderId?.toString()
            if (!orderId) {
                console.error("❌ Order ID not found in metadata!");
                res.status(400).json({ error: "Order ID not found in metadata!" });
                return;
            }
        
            const updatedOrder = await Order.findByIdAndUpdate(
                orderId, 
                { $set: { status: 'paid', stripePaymentId: paymentIntent.id }},
                { new: true }
            );
        
            console.log("✅ Updated Order:", updatedOrder);
        }

        res.json({ received: true });
    }
    catch(error) {
        console.error("Webhook Signature Verification Failed:", error.message);
        res.status(400).send(`Webhook Error: ${error.message}`);
    }
}