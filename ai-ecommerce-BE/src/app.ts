import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { connectDB } from './config/database';
import productRoutes from './routes/product.routes';
import userRoutes from './routes/user.routes';
import cartRoutes from './routes/cart.routes';
import orderRoutes from './routes/order.routes';
import paymentRouters from './routes/payment.routes';
import errorHandler from './middleware/Errorhandler';


dotenv.config();
const app = express();
const port = process.env.PORT;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create http server
export const server = http.createServer(app);

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRouters);
app.use('/api/payment/webhook/stripe', express.raw({ type: 'application/json' }));


// Handler Error
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



