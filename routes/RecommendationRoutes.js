import express from "express";
import { getRecommendations } from "../controllers/recommendationController.js";

const router = express.Router();

// health check for this router
router.get("/ping", (req, res) => {
  res.json({ message: "recommend route alive" });
});

// main routes
router.get("/all", getRecommendations);
router.get("/mood-aesthetic", getRecommendations);
router.post("/", getRecommendations);

export default router;
