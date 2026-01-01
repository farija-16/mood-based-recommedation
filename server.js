import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
// Routes
import recommendationRoutes from "./routes/recommendation.routes.js";

dotenv.config();

const app = express();

/* =========================
   MIDDLEWARE (ORDER MATTERS)
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   BASIC HEALTH ROUTES
========================= */
app.get("/", (req, res) => {
  res.send("Auraverse Backend is running");
});

app.get("/api-test", (req, res) => {
  res.json({ message: "API test working" });
});


/* =========================
   ROUTES
========================= */
console.log("AUTH ROUTES LOADED");
app.use("/api/auth", authRoutes);
console.log("Mounting /api/recommend routes");
app.use("/api/recommend", recommendationRoutes);

/* =========================
   404 HANDLER (LAST)
========================= */
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

/* =========================
   SERVER START (FIRST)
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* =========================
   DATABASE CONNECTION (NON-BLOCKING)
========================= */
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:");
    console.error(err.message);
    console.log("⚠️ App is running WITHOUT database");
  }
})();
