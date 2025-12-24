import express from "express";

const router = express.Router();

router.get("/ping", (req, res) => {
  res.json({ message: "recommend route alive" });
});

router.get("/all", (req, res) => {
  res.json({ ok: true, source: "all" });
});

router.get("/mood-aesthetic", (req, res) => {
  res.json({ ok: true, source: "mood-aesthetic" });
});

router.post("/", (req, res) => {
  res.json({
    ok: true,
    body: req.body,
  });
});

export default router;
