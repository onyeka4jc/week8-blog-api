const Article = require("../models/Article");

// Express 5 forwards rejected async controller promises to the error middleware.
// Keeping controllers focused on HTTP orchestration avoids repeated try/catch blocks.

const createArticle = async (req, res) => {
  const article = await Article.create(req.body);

  res.status(201).json({
    message: "Article created successfully",
    article,
  });
};

const getArticles = async (req, res) => {
  const articles = await Article.find().sort({ createdAt: -1 });

  res.status(200).json({
    count: articles.length,
    articles,
  });
};

const getArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  return res.status(200).json(article);
};

const updateArticle = async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  return res.status(200).json({
    message: "Article updated successfully",
    article,
  });
};

const deleteArticle = async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id);

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  return res.status(200).json({
    message: "Article deleted successfully",
    article,
  });
};

const searchArticles = async (req, res) => {
  const query = typeof req.query.q === "string" ? req.query.q.trim() : "";

  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  const articles = await Article.find({ $text: { $search: query } });

  return res.status(200).json({
    count: articles.length,
    articles,
  });
};

module.exports = {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
  searchArticles,
};
