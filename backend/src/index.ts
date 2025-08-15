import dotenv from "dotenv";
dotenv.config();

import express from "express";
import session from "express-session";
import cors from "cors";
import passport from "./config/passport";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import mongoose from "mongoose";
import type { VercelRequest, VercelResponse } from "@vercel/node";

declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function cachedConnectDB(): Promise<mongoose.Connection> {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI!, { bufferCommands: false })
      .then((mongooseInstance) => mongooseInstance.connection);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Session + Passport (optional in serverless)
app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

// Root route to prevent 404
app.get("/", (req, res) => {
  res.send("Backend is running. Use /api for API endpoints.");
});

// Health check API
app.get("/api", (req, res) => {
  res.send("API is running and connected to MongoDB!");
});

// API routes
app.use("/api", userRoutes);

// Error handler
app.use(errorHandler);

// Vercel serverless handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  await cachedConnectDB();
  app(req, res);
}
