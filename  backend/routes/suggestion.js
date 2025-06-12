const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async (req, res) => {
  const { title, suggestion, submitted_by } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO suggestions (title, suggestion, submitted_by) VALUES ($1, $2, $3) RETURNING *",
      [title, suggestion, submitted_by]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to submit suggestion" });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM suggestions ORDER BY submitted_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

module.exports = router;
