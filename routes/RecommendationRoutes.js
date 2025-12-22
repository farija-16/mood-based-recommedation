import express from "express";
import {getRecommendations} from "../controllers/recommendationContoller.js";

const router = express.Router();
//router.get("/trending",getTrending);
router.get("/all",getRecommendations);
router.get("/mood-aesthetic",getRecommendations);

export default router;