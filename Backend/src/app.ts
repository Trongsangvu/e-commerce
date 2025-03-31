import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/database';
import productRoutes from './routes/product.routes';
import userRoutes from './routes/user.routes';
import cartRoutes from './routes/cart.routes';
import orderRoutes from './routes/order.routes';
import authRoutes from './routes/auth.routes';
import paymentRouters from './routes/payment.routes';
import webhookRouters from './routes/webhook.routes';
import errorHandler from './middleware/Errorhandler';


dotenv.config();
const app = express();
const port = process.env.PORT;

// Connect to MongoDB
connectDB();

app.use(cors());

// Webhook
app.use('/api/webhook', express.raw({ type: 'application/json' }), webhookRouters);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Create http server
// export const server = http.createServer(app);

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRouters);

// Handler Error
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



