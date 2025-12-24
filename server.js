import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// ROUTES (IMPORT AFTER dotenv)
import recommendationRoutes from "./routes/recommendation.routes.js";

dotenv.config();

const app = express();

/* =====================
   MIDDLEWARES
===================== */
app.use(cors());
app.use(express.json());

/* =====================
   ROOT HEALTH CHECK
===================== */
app.get("/", (req, res) => {
  res.send("Auraverse Backend is running");
});

/* =====================
   API ROUTES (IMPORTANT: BEFORE 404)
===================== */
console.log("Mounting /api/recommend routes");
app.use("/api/recommend", recommendationRoutes);

/* =====================
   FALLBACK 404 (MUST BE LAST)
===================== */
app.use((req, res) => {
  res.status(404).send("Not Found");
});

/* =====================
   DATABASE
===================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

/* =====================
   SERVER
===================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
