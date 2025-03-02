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
                    
            case 'paypal':
            
            default:
                res.status(400).json({ error: 'Invalid payment method' });
                return;
        }

        res.json(response);
    }
    catch(error) {
        next(error);
    }
}