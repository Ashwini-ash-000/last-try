const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async (req, res) => {
  const { faculty_name, rating, comment, submitted_by } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO feedback (faculty_name, rating, comment, submitted_by) VALUES ($1, $2, $3, $4) RETURNING *",
      [faculty_name, rating, comment, submitted_by]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to submit feedback" });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM feedback ORDER BY submitted_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
});

module.exports = router;
