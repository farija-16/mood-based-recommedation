import express from "express";
import { getRecommendations } from "../controllers/recommendationController.js";

const router = express.Router();

// 1. Health Check (Keep this to verify the server is alive)
router.get("/ping", (req, res) => {
  res.json({ message: "recommend route alive" });
});

// 2. THE REAL ROUTES
// These now all point to getRecommendations instead of those res.json test blocks
router.get("/mood-aesthetic", getRecommendations);
router.get("/all", getRecommendations);
router.post("/", getRecommendations);

export default router;