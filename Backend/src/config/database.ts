import mongoose from 'mongoose';

const mongouri = process.env.MONGODB_URI;

if(!mongouri) {
    throw new Error('MONGODB_URI is not defined in the environment variables');
}

export const connectDB = async () => {
    try {
        await mongoose.connect(mongouri as string);
        console.log('Connected to MongoDB');
    }
    catch(err) {
        console.log('Error connecting to MongoDB', err);
    }
}
