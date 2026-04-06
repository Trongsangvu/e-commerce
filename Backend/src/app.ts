import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import { CONSTANTS } from "./config/constants";
import logger from "./config/logger";
import { ApiResponse } from "./config/response";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware";
import router from "./routes";

const app: Application = express();

// Security Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  }),
);

// CORS Configuration
const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (CONSTANTS.ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    } else {
      logger.warn(`Blocked CORS request from origin: ${origin}`);
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));

// Body parsers
app.use(
  bodyParser.json({
    limit: "10mb",
    verify: (req: Request, _res: Response, buf: Buffer) => {
      req.rawBody = buf;
    },
  }),
);

app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// Cookie and Session Configuration
app.use(cookieParser(CONSTANTS.COOKIE_SECRET));
app.use(
  cookieSession({
    name: CONSTANTS.SESSION_NAME,
    keys: [CONSTANTS.SESSION_SECRET as string],
    maxAge: Number(CONSTANTS.SESSION_MAX_AGE),
    httpOnly: true,
    secure: CONSTANTS.NODE_ENV === "production",
    sameSite: "lax",
  }),
);

// Health Check Endpoint
app.use("/health", (_req, res) => {
  ApiResponse.OK(res, { status: "ok", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/v1", router);

// 404 Handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

export default app;
