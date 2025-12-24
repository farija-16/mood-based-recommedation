import express from "express";
import { getRecommendations } from "../controllers/recommendationController.js";

const router = express.Router();

router.get("/api/recommend/ping", (req, res) => {
  res.json({ message: "recommend route alive" });
});

router.get("/api/recommend/all", getRecommendations);

router.get("/api/recommend/mood-aesthetic", getRecommendations);

router.post("/api/recommend", getRecommendations);

export default router;
