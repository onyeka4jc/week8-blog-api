require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Week 8 Blog API is running",
  });
});

// Article routes
app.use("/articles", articleRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});