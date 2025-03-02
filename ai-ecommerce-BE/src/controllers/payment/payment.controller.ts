import { Request, Response, NextFunction } from 'express';
import stripe from '../../config/payment/stripe';
import paypalClient from '../../config/payment/paypal';
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

export const checkoutPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { amount, currency, method } = req.body;
        let response;

        switch (method) {
            case 'stripe':
                const paymentIntent = await stripe.paymentIntents.create({
                    amount,
                    currency,
                    payment_method_types: ['card'],
                });
                response = { clientSecret: paymentIntent.client_secret};
                break;
            case 'paypal':
                const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
                request.requestBody({
                    intent: 'CAPTURE',
                    purchase_units: [{ amount: { currency_code: currency, value: amount.toFixed(2) }}]
                })
                const order = await paypalClient.execute(request);
                response = { orderId: order.result.id, approvalUrl: order.result.links[1].href };
                break;
            default:
                res.status(400).json({ error: 'Invalid payment method' });
                return;
        }

        res.json(response);
    }
    catch(error) {
        res.status(500).json({ message: "Payment processing failed" });
    }
}