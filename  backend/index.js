const express = require("express");
const cors = require("cors");
require("dotenv").config();

const feedbackRoutes = require("./routes/feedback");
const suggestionRoutes = require("./routes/suggestion");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/feedback", feedbackRoutes);
app.use("/api/suggestions", suggestionRoutes);

app.get("/", (req, res) => {
  res.send("Faculty Feedback Portal API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
