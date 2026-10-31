const express = require("express");
const articleRoutes = require("./routes/articleRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Week 8 Blog API is running",
    status: "ok",
  });
});

app.use("/articles", articleRoutes);

// Error middleware must be registered after all routes.
app.use(notFound);
app.use(errorHandler);

module.exports = app;
