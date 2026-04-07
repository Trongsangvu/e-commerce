import winston from "winston";
import path from "path";

// Custom log format
const logFormat = winston.format.printf(
  ({ level, message, timestamp, stack }) => {
    // If there's an error stack trace, include it; otherwise just the message
    return `${timestamp} ${level.toUpperCase()}${stack || message}`;
  },
);

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }), // Captures the stack trace
    winston.format.splat(),
    winston.format.json(),
  ),
  transports: [
    // 1. Write all logs with level 'error' and below to `error.log`
    new winston.transports.File({
      filename: path.join("logs", "error.log"),
      level: "error",
    }),
    // 2. Write all logs with level 'info' and below to `combined.log`
    new winston.transports.File({
      filename: path.join("logs", "combined.log"),
    }),
  ],
});

// If we're in development, also log to the `console` with pretty colors
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: "HH:mm:ss" }),
        logFormat,
      ),
    }),
  );
}

// Exported helper functions to match your ApiResponse usage
export const logError = (err: any): void => {
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error(new Error(String(err)));
  }
};

export const logInfo = (message: string, metadata?: any): void => {
  logger.info(message, metadata);
};

export const logWarn = (message: string, metadata?: any): void => {
  logger.warn(message, metadata);
};

export default logger;
