import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppDataSource } from "./config/db";
import routes from "./routes";

const app: Application = express();

// Add CORS middleware
app.use(cors({
    origin: "http://localhost:5173", // Allow only your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],        // Allow these HTTP methods
  }));

  // Parse JSON requests using Express.js middleware
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true }));

// Connect to database and start server
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
    app.use("/api", routes); 
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error: unknown) => console.log("Database connection error:", error));