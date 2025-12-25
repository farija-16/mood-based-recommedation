import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import recommendationRoutes from "./recommendation.routes.js";

dotenv.config();

const app = express();

/* ---------- CORE MIDDLEWARE (MUST COME FIRST) ---------- */
app.use(cors());
app.use(express.json());              //  REQUIRED FOR POST
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

/* ---------- START SERVER ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
