import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

// Database
import { initializeDatabase, closeDatabase } from "./database/init.js";

// Routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

// Middleware
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize database
const startServer = async () => {
  try {
    console.log("🚀 Starting server...");

    // Initialize database
    const dbInitialized = await initializeDatabase();
    if (!dbInitialized) {
      console.error("❌ Failed to initialize database");
      process.exit(1);
    }

    // Rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: "Too many requests from this IP, please try again later.",
    });

    // Middleware
    app.use(helmet());
    app.use(limiter);
    app.use(
      cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:5173",
        credentials: true,
      })
    );
    app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true }));

    // Health check endpoint
    app.get("/api/health", (req, res) => {
      res.status(200).json({
        status: "OK",
        message: "Server is running",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        database: "Connected",
      });
    });

    // API Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/users", userRoutes);

    // Error handling middleware
    app.use(notFound);
    app.use(errorHandler);

    // Start server
    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`
      );
      console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
      console.log(`💾 Database: MySQL`);
    });

    // Graceful shutdown
    process.on("SIGTERM", async () => {
      console.log("🔄 Received SIGTERM, shutting down gracefully...");
      await closeDatabase();
      process.exit(0);
    });

    process.on("SIGINT", async () => {
      console.log("🔄 Received SIGINT, shutting down gracefully...");
      await closeDatabase();
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Start the server
startServer();

export default app;
