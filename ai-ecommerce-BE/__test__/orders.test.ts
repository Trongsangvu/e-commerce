import request from 'supertest';
import { test, describe, expect, beforeAll, afterAll } from '@jest/globals';
import express from 'express';
import { Order } from '../src/models/Order';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { server } from '../src/app';
import jwt from 'jsonwebtoken';

const app = express();

let mongoServer: MongoMemoryServer;

const fakeToken = jwt.sign(
    { userId: '', email: 'mangtrungzos@gmail.com' },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1h' }
);

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongoUri);
        console.log(`MongoDB Memory Server connected: ${mongoUri}`);
    }

    server.listen(3001, () => {
        console.log("Test server running on port 3001");
    });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
    await mongoServer.stop();
    server.close()
});

describe('Order API Tests', () => {
    test('GET /api/orders - should return empty array initally', async () => {
        const res = await request(server)
            .get('/api/orders')
            .set('Authorization', `Bearer ${fakeToken}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);     
    });

    test('POST /api/orders - should create a new order', async () => {
        const newOrder = {
            userId: new mongoose.Types.ObjectId(),
            products: [{ productId: new mongoose.Types.ObjectId(), quantity: 2 }],
            totalAmount: 100,
            paymentMethod:'credit_card' 
        }
        const res = await request(server).post('/api/orders').send(newOrder);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('_id');
    });

    test('PUT /api/orders/:id - should update an order', async () => {
        const order = new Order({
            userId: new mongoose.Types.ObjectId(),
            products: [{ productId: new mongoose.Types.ObjectId(), quantity: 1 }],
            totalAmount: 50,
            paymentMethod: 'paypal'
        });
        await order.save();

        const res = await request(server).put(`/api/orders/${order._id}`).send({ totalAmount: 200 });
        expect(res.status).toBe(200);
        expect(res.body.order.totalAmount).toBe(200);
    });

    test('PATCH /api/orders/:id/status - should update order status', async () => {
        const order = new Order({
            userId: new mongoose.Types.ObjectId(),
            products: [{ productId: new mongoose.Types.ObjectId(), quantity: 1 }],
            totalAmount: 150,
            paymentMethod: 'cash',
            status: 'pending'
        });
        await order.save();

        const res = await request(server).patch(`/api/orders/${order._id}/status`).send({ status: 'shipped' });
        expect(res.status).toBe(200);
        expect(res.body.order.status).toBe('shipped');
    })
});

