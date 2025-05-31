import mongoose from "mongoose";

export async function connectMongo() {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error('MONGO_URI is not defined');

    try {
        await mongoose.connect(uri, {
            dbName: "melting-pot-prod",
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}