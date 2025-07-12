import mongoose from "mongoose";
import { config } from "dotenv";

import { logger } from "@/lib/logger";

config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI && process.env.NODE_ENV !== "production") {
  logger.warn("⚠️ MONGODB_URI no definida, se usará mock en dev");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

/**
 * Connect to MongoDB using Mongoose. Connection is cached
 * across hot reloads to prevent exhausting the database.
 */
export default async function dbConnect() {
  if (!MONGODB_URI) return null;

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((m) => m);
  }

  cached.conn = await cached.promise;

  return cached.conn;
}
