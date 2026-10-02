const express = require("express");

const {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
  searchArticles,
} = require("../controllers/articleController");

const validateArticle = require("../middleware/validateArticle");

const router = express.Router();

// POST /articles
router.post("/", validateArticle, createArticle);

// GET /articles
router.get("/", getArticles);

// GET /articles/search
router.get("/search", searchArticles);

// GET /articles/:id
router.get("/:id", getArticle);

// PUT /articles/:id
router.put("/:id", validateArticle, updateArticle);

// DELETE /articles/:id
router.delete("/:id", deleteArticle);

module.exports = router;