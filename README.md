# Week 8 Blog API — MVC Refactor Assignment

A RESTful Blog API built with Node.js, Express 5, MongoDB, Mongoose and Joi. This version restructures the original Week 8 project into a modular MVC-style application and validates its environment configuration at startup.

## Features retained

- Create an article
- Retrieve all articles
- Retrieve one article by ID
- Update an article
- Delete an article
- Search articles using MongoDB text search
- Validate article input with Joi
- Seed sample articles without deleting existing records

## MVC project structure

```text
week8-blog-api/
├── src/
│   ├── app.js
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   ├── controllers/
│   │   └── articleController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   ├── notFound.js
│   │   ├── validateArticle.js
│   │   └── validateObjectId.js
│   ├── models/
│   │   └── Article.js
│   └── routes/
│       └── articleRoutes.js
├── scripts/
│   └── seedArticles.js
├── tests/
│   ├── app.test.js
│   └── env.test.js
├── postman/
│   └── Week8-Blog-API.postman_collection.json
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

### Separation of responsibilities

- **Models:** define the MongoDB article schema.
- **Views:** this is a JSON REST API, so JSON responses serve as the API representation rather than server-rendered HTML views.
- **Controllers:** contain request handling and article operations.
- **Routes:** map HTTP methods and URLs to controllers and middleware.
- **Middleware:** validates incoming data and IDs, handles unknown routes and centralizes errors.
- **Config:** loads and validates environment variables and connects to MongoDB.
- **app.js:** configures Express and registers middleware/routes without starting the listener.
- **server.js:** connects to MongoDB and starts the HTTP server.

## Requirements

- Node.js 20 or later
- npm
- A MongoDB database (MongoDB Atlas or a local MongoDB instance)

## Local setup (Windows PowerShell)

1. Open PowerShell in the project folder.
2. Install dependencies:

   ```powershell
   npm install
   ```

3. Create your local environment file:

   ```powershell
   Copy-Item .env.example .env
   ```

4. Open `.env` and replace the `MONGO_URI` placeholder with your actual MongoDB connection string. Keep this file private; it is excluded by `.gitignore`.
5. Start the development server:

   ```powershell
   npm run dev
   ```

The server connects to MongoDB before listening. By default, it listens on port 5000.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `MONGO_URI` | Yes | MongoDB connection string (`mongodb://` or `mongodb+srv://`). |
| `PORT` | No | HTTP port; defaults to `5000`. Render supplies its own port at runtime. |
| `NODE_ENV` | No | `development`, `test` or `production`; defaults to `development`. |

`src/config/env.js` validates the values before the server starts. Error messages identify invalid variable names without printing connection strings or credentials.

## API endpoints

Base URL for local development: `http://localhost:5000`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API status |
| POST | `/articles` | Create an article |
| GET | `/articles` | Retrieve all articles |
| GET | `/articles/search?q=keyword` | Search articles by title/content |
| GET | `/articles/:id` | Retrieve one article |
| PUT | `/articles/:id` | Update an article |
| DELETE | `/articles/:id` | Delete an article |

Example JSON body for POST and PUT:

```json
{
  "title": "Getting Started with Node.js",
  "content": "Node.js allows developers to build fast and scalable backend applications using JavaScript.",
  "author": "Jane Doe"
}
```

The `author` field is optional and defaults to `Guest`.

## Testing

Run the automated tests:

```powershell
npm test
```

The tests cover the API status route, unknown routes, request validation, invalid article IDs, malformed JSON and environment-variable validation. They do not require a running MongoDB instance because the tested invalid requests are rejected before database access.

For manual endpoint testing, import `postman/Week8-Blog-API.postman_collection.json` into Postman. Set the collection variable `baseUrl` to your local or deployed API URL. Requests that need an existing article require a valid `articleId`.

## Seed sample articles

After configuring MongoDB, run:

```powershell
npm run seed
```

The seed script inserts sample articles only when the collection is empty. It deliberately does not delete or overwrite existing articles.

## Render deployment

1. Push the project to your GitHub repository.
2. In Render, create a **Web Service** and connect the repository.
3. Use these settings:
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add the following environment variables in the Render service settings:
   - `MONGO_URI` = your production MongoDB connection string
   - `NODE_ENV` = `production`
5. Render supplies `PORT` automatically. The application reads it and binds to `0.0.0.0`.
6. Deploy and test the service root URL and the `/articles` endpoints.

Do not put database credentials in source files, screenshots, README examples or Git commits. Ensure your MongoDB Atlas network access settings allow the Render service to connect, using a secure configuration appropriate for your deployment.

## Security notes

- `.env` is excluded from Git.
- `.env.example` contains placeholders only.
- Internal stack traces and database error details are not returned to API clients.
- The JSON request body is limited to 1 MB.
- The seed command does not clear existing data.
