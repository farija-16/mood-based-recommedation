import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import RecommendationRoutes from "./routes/RecommendationRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

/* ------------------ BASIC MIDDLEWARE ------------------ */
app.use(cors());
app.use(express.json());

/* ------------------ ROOT HEALTH CHECK ------------------ */
app.get("/", (req, res) => {
  res.send("Auraverse Backend is running");
});

/* ------------------ ROUTE MOUNTING (CRITICAL ORDER) ------------------ */
console.log("Mounting /api/recommend routes");
app.use("/api/recommend", RecommendationRoutes);

console.log("Mounting /api/auth routes");
app.use("/api/auth", authRoutes);

/* ------------------ 404 HANDLER (VERY IMPORTANT) ------------------ */
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

/* ------------------ DATABASE ------------------ */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

/* ------------------ SERVER ------------------ */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
