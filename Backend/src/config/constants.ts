import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: `.env.${process.env.NODE_ENV}` });

export const CONSTANTS = {
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
  ROLE: ["admin", "user"],
  ROLE_RESET_PASSWORD_TOKEN: "RESET_PASSWORD_TOKEN",

  // Database
  MONGODB_URI: process.env.MONGODB_URI,
  DB_MAX_RETRIES: 5,
  DB_RETRY_DELAY: 5000,

  // Common
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 5000,
  SESSION_SECRET: process.env.SESSION_SECRET,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  SESSION_NAME: process.env.SESSION_NAME || "session",
  SESSION_MAX_AGE: process.env.SESSION_MAX_AGE || 30 * 60 * 1000, // 30 minutes

  // Jwt
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
  JWT_EXPIRES_SIGNIN: process.env.JWT_EXPIRES_IN || "30d",
  JWT_EXPIRES_RESET_PASS: process.env.JWT_EXPIRES_RESET_PASS || "1d",
  AUTH_REFRESH_TOKEN_EXPIRY: process.env.AUTH_REFRESH_TOKEN_EXPIRY || "7d",
  AUTH_ACCESS_TOKEN_EXPIRY: process.env.AUTH_ACCESS_TOKEN_EXPIRY || "48h",

  // Cors
  ALLOWED_ORIGINS: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://e-commerce-cozastore.vercel.app",
  ],

  // Redis
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PORT: process.env.REDIS_PORT || 6379,

  // Kafka
  KAFKA_BROKERS: process.env.KAFKA_BROKERS,
  KAFKAJS_NO_PARTITIONER_WARNING: process.env.KAFKAJS_NO_PARTITIONER_WARNING,

  // Twilio
  TWILIO_ACC_SID: process.env.TWILIO_ACC_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,

  // Payment
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,

  // Paypal
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET_KEY: process.env.PAYPAL_CLIENT_SECRET_KEY,

  // OAuth
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
};
