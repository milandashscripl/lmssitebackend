import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import superAdminRoutes from "./routes/superAdminRoutes.js";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import instituteRoutes from "./routes/instituteRoutes.js"

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
app.use("/api/super-admin", superAdminRoutes);
app.use("/api/institue", instituteRoutes);

/* ======================
   SERVER
====================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});