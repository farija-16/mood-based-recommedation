import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import RecommendationRoutes from "./routes/RecommendationRoutes.js";

const app = express();

/* =======================
   GLOBAL MIDDLEWARE FIRST
======================= */
app.use(cors());
app.use(express.json());

/* =======================
   DEBUG LOGS (IMPORTANT)
======================= */
console.log("Loaded ENV Keys:", {
  mongo: process.env.MONGO_URI ? "OK" : "MISSING",
  tmdb: process.env.TMDB_ACCESS_TOKEN ? "OK" : "MISSING",
  books: process.env.GOOGLE_BOOKS_API_KEY ? "OK" : "MISSING",
});

console.log("TYPE OF RecommendationRoutes:", typeof RecommendationRoutes);

/* =======================
   DATABASE CONNECTION
======================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

/* =======================
   ROUTES (ORDER MATTERS)
======================= */

// App-level health check
app.get("/__ping__", (req, res) => {
  res.json({ message: "APP LEVEL PING WORKS" });
});

// Auth routes
app.use("/api/auth", authRoutes);

// Recommendation routes
console.log("Mounting /api/recommend routes");
app.use("/api/recommend", RecommendationRoutes);

// Root test route (KEEP THIS LAST)
app.get("/", (req, res) => {
  res.send("Auraverse Backend is running");
});

/* =======================
   ERROR SAFETY
======================= */
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED PROMISE:", err);
});

/* =======================
   SERVER START
======================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
