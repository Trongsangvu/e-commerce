import { Request, Response, NextFunction } from 'express';
import stripe from '../../config/payment/stripe';
import paypalClient from '../../config/payment/paypal';
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';
import { Order } from '../../models/Order';

export const checkoutPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { orderId, method } = req.body;
        let response;

        const order = await Order.findById(orderId);
        if (!order) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }

        const amount = Math.round(order.totalAmount * 100);
        if (isNaN(amount)) {
            res.status(400).json({ error: 'Invalid totalAmount in order' });
            return;
        }

        const currency = "usd"; // Bạn có thể lấy currency từ đơn hàng nếu cần

        switch (method) {
            case 'stripe':
                const paymentIntent = await stripe.paymentIntents.create({
                    amount,
                    currency,
                    payment_method_types: ['card'],
                    metadata: { orderId: `${order._id}` }
                });

                console.log("Created Stripe PaymentIntent:", paymentIntent.id);
                console.log("Metadata sent:", paymentIntent.metadata);

                const updatedOrder = await Order.findByIdAndUpdate(
                    orderId,
                    { $set: { stripePaymentId: paymentIntent.id }},
                    { new: true }
                );
                console.log("Order updated with PaymentIntent:", updatedOrder);

                response = { clientSecret: paymentIntent.client_secret};
                break;

            case 'paypal':
                const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
                request.requestBody({
                    intent: 'CAPTURE',
                    purchase_units: [{ amount: { currency_code: currency, value: amount.toFixed(2) }}]
                })
                const paypalOrder = await paypalClient.execute(request);
                response = { orderId: paypalOrder.result.id, approvalUrl: paypalOrder.result.links[1].href };
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

export const getStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);

        if(!order) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }

        res.status(200).json({ status: order.status });
    }
    catch(error) {
        next(error);
    }
}