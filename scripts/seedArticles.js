const mongoose = require("mongoose");
const connectDB = require("../src/config/db");
const Article = require("../src/models/Article");

const sampleArticles = [
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

const seedArticles = async () => {
  try {
    await connectDB();

    const existingCount = await Article.countDocuments();
    if (existingCount > 0) {
      console.log(
        `Seeding skipped: the database already contains ${existingCount} article(s). No existing records were deleted.`
      );
      return;
    }

    const createdArticles = await Article.insertMany(sampleArticles);
    console.log(`${createdArticles.length} sample articles seeded successfully`);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedArticles();
