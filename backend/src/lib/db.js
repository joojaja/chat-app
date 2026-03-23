import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI); // connect to DB
        console.log(`MongoDB connected: ${conn.connection.host}`); // successful connection
    } catch (error) {
        console.log(`MongoDB connection error:`, error); // output error
    }

};