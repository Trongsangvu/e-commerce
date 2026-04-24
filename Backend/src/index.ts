import logger from "./configs/logger";
import app from "./app";
import { CONSTANTS } from "./configs/constants";
import { createServer, Server } from "http";
import MongoDBConnectionManager from "./configs/mongodb";
import { BadgeJob } from "./jobs/badge.job";

// configuration
const config = {
  port: CONSTANTS.PORT,
  mongoUri: CONSTANTS.MONGODB_URI!,
  mongoConfig: {
    serverSelectionTimeoutMS: 5000, // 5 seconds
    socketTimeoutMS: 45000, // 45 seconds
    maxPoolSize: 10,
    minPoolSize: 5,
    maxIdleTimeMS: 30000, // 30 seconds
    bufferCommands: false,
  },
};

// Initialize server
app.set("port", config.port);

class ServerManager {
  private server: Server;
  private port: number | string;

  constructor(port: number | string) {
    this.port = port;
    this.server = createServer(app);
    this.setupErrorHandling();
  }

  public start() {
    this.server.listen(this.port, () => {
      logger.info(`🚀 Server successfully started on port: ${this.port}`);
    });
  }

  private setupErrorHandling(): void {
    this.server.on("error", (error: NodeJS.ErrnoException) => {
      if (error.syscall !== "listen") throw error;

      switch (error.code) {
        case "EACCES":
          logger.error(`${this.port} requires elevated privileges`);
          process.exit(1);
          break;
        case "EADDRINUSE":
          logger.error(`${this.port} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    });
  }

  public getHttpServer(): Server {
    return this.server;
  }
}

class Application {
  private dbManager: MongoDBConnectionManager;
  private serverManager: ServerManager;
  private badgeJob: BadgeJob;

  constructor() {
    this.dbManager = MongoDBConnectionManager.getInstance();
    this.serverManager = new ServerManager(config.port);
    this.badgeJob = new BadgeJob();
  }

  public async start(): Promise<void> {
    try {
      logger.info("Initializing Application...");

      // 1. Connect to Database
      await this.dbManager.connect(config.mongoUri);

      // 2. Start the HTTP Server
      this.serverManager.start();

      // 3. Start Background Jobs
      this.badgeJob.start();

      // 4. Setup Shutdown
      this.setupShutdownHandlers();
    } catch (error) {
      logger.error("Failed to start application:");
      logger.error(error);
      process.exit(1);
    }
  }

  private setupShutdownHandlers(): void {
    const shutdown = async (signal: string) => {
      logger.warn(`Received ${signal}. Starting graceful shutdown...`);

      // Close DB connection
      await this.dbManager.disconnect();

      // Close HTTP server
      this.serverManager.getHttpServer().close(() => {
        logger.info("HTTP server closed.");
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  }
}

// Start the application
const application = new Application();
application.start();
