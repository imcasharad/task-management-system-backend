import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/db";
import groupRoutes from "./routes/groupRoutes";

const app = express();

// Add CORS middleware
app.use(cors({
    origin: "http://localhost:5173", // Allow only your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],        // Allow these HTTP methods
  }));

  // Parse JSON requests using Express.js middleware
app.use(express.json()); // Parse JSON requests

// Connect to database and start server
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
    app.use("/api", groupRoutes); // Mount routes under /api
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error: unknown) => console.log("Database connection error:", error));