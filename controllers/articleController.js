const mongoose = require("mongoose");
const Article = require("../models/article");

// CREATE ARTICLE
const createArticle = async (req, res) => {
  try {
    const article = await Article.create(req.body);

    res.status(201).json({
      message: "Article created successfully",
      article,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create article",
      error: error.message,
    });
  }
};

// GET ALL ARTICLES
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: articles.length,
      articles,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve articles",
      error: error.message,
    });
  }
};

// GET ONE ARTICLE
const getArticle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid article ID",
      });
    }

    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve article",
      error: error.message,
    });
  }
};

// UPDATE ARTICLE
const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid article ID",
      });
    }

    const article = await Article.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    res.status(200).json({
      message: "Article updated successfully",
      article,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update article",
      error: error.message,
    });
  }
};

// DELETE ARTICLE
const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid article ID",
      });
    }

    const article = await Article.findByIdAndDelete(id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    res.status(200).json({
      message: "Article deleted successfully",
      article,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete article",
      error: error.message,
    });
  }
};

// SEARCH ARTICLES
const searchArticles = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const articles = await Article.find({
      $text: {
        $search: q,
      },
    });

    res.status(200).json({
      count: articles.length,
      articles,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error searching articles",
      error: error.message,
    });
  }
};

// EXPORT CONTROLLERS
module.exports = {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
  searchArticles,
};