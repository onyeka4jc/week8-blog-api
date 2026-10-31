const express = require("express");
const articleController = require("../controllers/articleController");
const validateArticle = require("../middleware/validateArticle");
const validateObjectId = require("../middleware/validateObjectId");

const router = express.Router();

// Keep the search route before /:id so "search" is not treated as an ID.
router.post("/", validateArticle, articleController.createArticle);
router.get("/", articleController.getArticles);
router.get("/search", articleController.searchArticles);
router.get("/:id", validateObjectId, articleController.getArticle);
router.put("/:id", validateObjectId, validateArticle, articleController.updateArticle);
router.delete("/:id", validateObjectId, articleController.deleteArticle);

module.exports = router;
