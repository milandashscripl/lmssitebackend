import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();



import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";


const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));

connectDB();

app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT || 5000, () =>
      console.log("✅ Server running & DB connected")
    )
  )
  .catch((err) => console.error("❌ DB Connection Error:", err));
