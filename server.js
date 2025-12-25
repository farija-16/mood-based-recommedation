import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import recommendationRoutes from "./routes/recommendation.routes.js";

dotenv.config();

const app = express();

/* ---------- CORE MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- ROUTES ---------- */
app.use("/api/recommend", recommendationRoutes);

/* ---------- ROOT ---------- */
app.get("/", (req, res) => {
  res.send("Auraverse Backend is running");
});

/* ---------- 404 FALLBACK ---------- */
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

/* ---------- GLOBAL ERROR HANDLER ---------- */
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

/* ---------- DATABASE + SERVER START ---------- */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
