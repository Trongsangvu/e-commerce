import { createClient } from "redis";

// Initialize Redis client
export const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: parseInt(process.env.REDIS_PORT || "6379", 10),
    reconnectStrategy: (retries: number) => {
      return Math.min(retries * 50, 2000);
    },
  },
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => console.log("Connected to Redis"));

export class RedisService {
  static async connect() {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log("Redis connected successfully");
    }
  }

  // Set a key-value pair with optional expiration time (in seconds)
  static async set(key: string, value: string, expireTime?: number) {
    if (expireTime) return redisClient.setEx(key, expireTime, value);
    return redisClient.set(key, value);
  }

  // Get the value of a key
  static async get(key: string) {
    return redisClient.get(key);
  }

  // Delete a key
  static async del(key: string) {
    return redisClient.del(key);
  }

  // Set a JSON value by key
  static async setJSON(key: string, value: unknown, expireTime?: number) {
    return this.set(key, JSON.stringify(value), expireTime);
  }

  // Get a JSON value by key
  static async getJSON<T>(key: string): Promise<T | null> {
    const data = await this.get(key);
    return data ? JSON.parse(data) : null;
  }
}
