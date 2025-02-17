import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const mongouri = process.env.MONGODB_URI;

export const connectDB = async () => {
    try {
        await mongoose.connect(mongouri as string);
        console.log('Connected to MongoDB');
    }
    catch(err) {
        console.log('Error connecting to MongoDB', err);
    }
}
