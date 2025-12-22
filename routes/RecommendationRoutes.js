const express = require("express");
const { getRecommendations } = require("../controllers/recommendationController");

const router = express.Router();

router.get("/all", getRecommendations);
router.get("/mood-aesthetic", getRecommendations);
router.post("/", getRecommendations);

module.exports = router;
