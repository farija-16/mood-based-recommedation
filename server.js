import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import RecommendationRoutes from "./routes/RecommendationRoutes.js";

dotenv.config();

const app = express();

/* ---------- MIDDLEWARE (ORDER MATTERS) ---------- */
app.use(cors());
app.use(express.json());

/* ---------- BASIC TEST ROUTES ---------- */
app.get("/", (req, res) => {
  res.send("Auraverse Backend is running");
});

app.get("/api-test", (req, res) => {
  res.json({ ok: true });
});

/* ---------- API ROUTES (MUST COME BEFORE 404) ---------- */
console.log("Mounting /api/recommend routes");
app.use("/api/recommend", RecommendationRoutes);

/* ---------- 404 HANDLER (MUST BE LAST) ---------- */
app.use((req, res) => {
  res.status(404).send("Not Found");
});

/* ---------- SERVER START ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
