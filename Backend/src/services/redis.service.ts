import redisClient from "../config/redis/redis";

export class RedisService {
    private static async ensureConnection() {
        try {
            if (!redisClient.isOpen) {
                await RedisService.connect();
            } else {
                await redisClient.ping();
            }
        }
        catch(error) {
            console.error('Redis ping failed, reconnecting...', error);
            await redisClient.connect();
        }
    }

    static async connect() {
        try {
            if (!redisClient.isOpen) {
                await redisClient.connect();
                console.log('Redis connected successfully');
            }
        }
        catch(error) {
            console.error('Redis Connection Error:', error);
            throw error;
        }
    }

    static async set(key: string, value: string, expireTime?: number) {
        try {
            await this.ensureConnection();
            if(expireTime) {
                await redisClient.setEx(key, expireTime, value);
            } else {
                await redisClient.set(key, value);
            }
        } catch(error) {
            console.error('Redis Set Error:', error);
            throw error;
        }
    }

    static async get(key: string) {
        try {
            await this.ensureConnection();
            return await redisClient.get(key);
        } catch(error) {
            console.error('Redis Get Error:', error);
            throw error;
        }
    }

    static async del(key: string) {
        try {
            await this.ensureConnection();
            await redisClient.del(key);
        }
        catch(error) {
            console.error('Redis Delete Error:', error);
            throw error;
        }
    }
}
