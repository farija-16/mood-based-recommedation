import express from "express";
import { getRecommendations } from "../controllers/recommendationController.js";

const router = express.Router();

router.get("/ping", (req, res) => {
  res.json({ message: "recommend route alive" });
});

router.get("/all", getRecommendations);
router.get("/mood-aesthetic", getRecommendations);
router.post("/", getRecommendations);

export default router;
