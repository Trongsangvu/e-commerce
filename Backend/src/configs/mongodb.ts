import mongoose, { ConnectOptions } from "mongoose";
import { CONSTANTS } from "./constants";

class MongoDBConnectionManager {
  private static instance: MongoDBConnectionManager;
  private isConnected: boolean;
  private connectionAttempts: number;
  private maxRetries: number;
  private retryDelay: number;
  private config: ConnectOptions;
  private uri: string | null = null;

  // Private constructor for singleton pattern
  private constructor() {
    this.isConnected = false;
    this.connectionAttempts = 0;
    this.maxRetries = CONSTANTS.DB_MAX_RETRIES;
    this.retryDelay = CONSTANTS.DB_RETRY_DELAY;

    this.config = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 5,
      maxIdleTimeMS: 30000,
      bufferCommands: false,
      retryWrites: true,
      retryReads: true,
      autoIndex: true,
    };

    this.setupEventListeners();
  }

  // Get the singleton instance
  public static getInstance(): MongoDBConnectionManager {
    if (!MongoDBConnectionManager.instance) {
      MongoDBConnectionManager.instance = new MongoDBConnectionManager();
    }
    return MongoDBConnectionManager.instance;
  }

  // Connect to MongoDB
  public async connect(uri: string): Promise<void> {
    this.uri = uri;
    this.connectionAttempts++;

    try {
      console.log(
        `Attempting to connect to MongoDB (Attempt ${this.connectionAttempts}/${this.maxRetries})...`,
      );
      await mongoose.connect(uri, this.config);
    } catch (err) {
      console.error("❌ Initial connection failed:", err);
      this.handleRetry();
    }
  }

  // Handle connection retries
  private handleRetry(): void {
    if (this.connectionAttempts < this.maxRetries) {
      console.log(`Retrying in ${this.retryDelay / 1000}s...`);
      setTimeout(() => {
        this.connect(this.uri!);
      }, this.retryDelay);
    } else {
      console.error("Max connection retries reached. Exiting...");
      process.exit(1);
    }
  }

  // Setup Mongoose event listeners
  private setupEventListeners(): void {
    const db = mongoose.connection;

    // Connection successful
    db.on("connected", () => {
      this.isConnected = true;
      this.connectionAttempts = 0;
      console.log("✅ MongoDB Status: Connected");
    });

    // Connection error (runtime)
    db.on("error", (err) => {
      this.isConnected = false;
      console.error("❌ MongoDB Status: Error", err);
    });

    // Connection disconnected
    db.on("disconnected", () => {
      this.isConnected = false;
      console.warn("⚠️ MongoDB Status: Disconnected");
      this.handleRetry();
    });

    // Connection reconnected
    db.on("reconnected", () => {
      this.isConnected = true;
      console.log("🔄 MongoDB Status: Reconnected");
    });

    // Connection timeout
    db.on("timeout", () => {
      this.isConnected = false;
      console.error("⏰ MongoDB Status: Timeout");
      this.handleRetry();
    });

    // Connection closed
    db.on("close", () => {
      this.isConnected = false;
      console.warn("⚠️ MongoDB Status: Closed");
      this.handleRetry();
    });
  }

  // Disconnect from MongoDB
  public async disconnect(): Promise<void> {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }

  // Get current connection status
  public getStatus(): boolean {
    return this.isConnected;
  }
}

export default MongoDBConnectionManager;
