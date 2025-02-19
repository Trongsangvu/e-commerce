import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import productRoutes from './routes/productRoutes';
import errorHandler from './middleware/Errorhandler';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);

// Handler Error
app.use(errorHandler);

// Connect to MongoDB
connectDB();

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



