import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI is not defined in .env file");
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      tls: true, // ensure TLS/SSL for Atlas
    });

    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB connection failed", error);
    process.exit(1);
  }
};
