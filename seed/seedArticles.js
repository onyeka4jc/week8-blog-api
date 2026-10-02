require("dotenv").config();

const connectDB = require("../config/db");
const Article = require("../models/article");

const seedArticles = async () => {
  try {
    await connectDB();

    // Clear existing articles from the Week 8 database
    await Article.deleteMany({});

    const articles = [
      {
        title: "Getting Started with Node.js",
        content:
          "Node.js allows developers to build fast and scalable backend applications using JavaScript.",
        author: "John Doe",
      },
      {
        title: "Understanding REST APIs",
        content:
          "REST APIs allow different applications to communicate through standard HTTP methods and resources.",
        author: "Jane Smith",
      },
    ];

    const createdArticles = await Article.insertMany(articles);

    console.log(`${createdArticles.length} articles seeded successfully`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedArticles();