import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

/* ======================
   MIDDLEWARES
====================== */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://sikshyaa.netlify.app"
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* ======================
   DATABASE
====================== */
connectDB();

/* ======================
   ROUTES
====================== */
app.use("/api/auth", authRoutes);

/* ======================
   SERVER
====================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
