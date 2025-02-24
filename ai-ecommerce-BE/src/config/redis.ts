import { createClient } from "redis";

const redisClient = createClient({
    url: 'redis://127.0.0.1:6379'
});

redisClient.on("connect", () => console.log("Connected to Redis"));

redisClient.on("error", (err) => console.log("Redis Client Error: ", err));

async function connectRedis() {
    try {
        await redisClient.connect();
        console.log('Redis connection established');
      } catch (err) {
        console.error('Failed to connect to Redis:', err);
      }
}

connectRedis();

export default redisClient;
