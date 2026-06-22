import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Cache the connection across hot reloads / serverless invocations.
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var _mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global._mongoose ?? { conn: null, promise: null };
global._mongoose = cached;

export async function connectDB(): Promise<typeof mongoose> {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set in the environment.");
  }
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB || "furniflex",
      bufferCommands: false,
      // Fail fast (instead of the 30s default) so build-time/runtime callers can
      // fall back to the static dataset quickly when the DB is unreachable.
      serverSelectionTimeoutMS: 8000,
    }).catch((err) => {
      // Reset the cached promise so the next call can retry the connection.
      cached.promise = null;
      throw err;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

/** True when a database URI is configured (routes fall back to static data otherwise). */
export const hasDB = Boolean(MONGODB_URI);
