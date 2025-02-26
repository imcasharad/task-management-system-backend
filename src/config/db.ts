import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config(); // Load .env file

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "your_password",
  database: process.env.DB_NAME || "task_management",
  synchronize: false, // Auto-create tables (for dev only)
  logging: true,
  entities: ["src/models/*.ts"], // Where models are stored
});