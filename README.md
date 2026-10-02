# Week 8 Blog API

A backend REST API for creating, reading, updating, deleting, and searching blog articles.

This project was developed as part of the Week 8 Backend Development assignment using Node.js, Express, MongoDB, and Mongoose.

## Features

- Create blog articles
- Retrieve all articles
- Retrieve a single article
- Update an article
- Delete an article
- Validate article data using Joi
- Search articles using MongoDB text search
- MongoDB database integration
- Seed sample articles
- Environment variable configuration

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Joi
- dotenv
- Nodemon
- Postman
- Git and GitHub

## Project Structure

```text
week8-blog-api/
|
+-- config/
|   +-- db.js
|
+-- controllers/
|   +-- articleController.js
|
+-- middleware/
|   +-- validateArticle.js
|
+-- models/
|   +-- article.js
|
+-- routes/
|   +-- articleRoutes.js
|
+-- seed/
|   +-- seedArticles.js
|
+-- .gitignore
+-- package.json
+-- package-lock.json
+-- README.md
+-- server.js
```
