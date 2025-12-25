import express from "express";
import { getRecommendations } from "../controllers/recommendationController.js";

const router = express.Router();

//  HARD PROOF ROUTE
router.get("/ping", (req, res) => {
  res.json({ message: "recommend route alive" });
});

//  SIMPLE TEST ROUTES (NO LOGIC)
router.get("/all", (req, res) => {
  res.json({ test: "ALL route hit" });
});

router.get("/mood-aesthetic", (req, res) => {
  res.json({
    test: "MOOD-AESTHETIC route hit",
    mood: req.query.mood,
    aesthetic: req.query.aesthetic
  });
});

router.post("/", (req, res) => {
  res.json({
    test: "POST route hit",
    body: req.body
  });
});

export default router;
