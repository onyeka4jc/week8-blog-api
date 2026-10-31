# Blog API MVC Refactor — Build and Validation Report

## Input project

Refactored from the uploaded `week8-blog-api.zip` project. The source archive contained a Git repository and a local `.env` file. The refactored deliverable deliberately excludes `.env` and `node_modules`; `.env.example` is provided instead. The original repository Git metadata and its `origin` remote were retained for continuity.

## Assignment requirements completed

- Reorganised the application into a lecturer-style `src/` directory.
- Separated configuration, controllers, middleware, models and routes.
- Added `src/app.js` for Express application setup and kept `server.js` as the process entry point.
- Added required environment validation using Joi in `src/config/env.js`.
- Added `.env.example` and strengthened `.gitignore` so the real `.env` remains excluded.
- Kept the existing article create, list, read, update, delete and search endpoints.
- Added centralized 404 and error-handling middleware.
- Added request-body and ObjectId validation middleware.
- Moved the sample-data seed command to `scripts/seedArticles.js` and changed it so it will not erase existing articles.
- Added a Postman collection and updated README setup, endpoint, testing and Render deployment instructions.

## Validation performed in the build environment

- `npm test`: **8 tests passed, 0 failed**.
- `node --check` across all JavaScript source, script and test files: passed.
- Parsed `package.json` and the Postman collection JSON: passed.
- `npm ls --depth=0`: all declared dependencies resolved from the original project's included dependency tree.
- Confirmed `.env` is not present in the refactored deliverable and is not listed as a tracked file.

The tests cover the root status endpoint, unknown routes, invalid article payloads, invalid article IDs, malformed JSON, valid environment configuration, missing `MONGO_URI`, and invalid `PORT`.

## Not yet verified

- No live MongoDB instance was available, so database-backed CRUD/search calls and seeding have not been integration-tested in this build environment.
- A clean network-based `npm ci` could not be completed because the build environment had no cached copy of one required npm package. The tests were run using the dependency tree supplied inside the uploaded project archive. The package lockfile was retained and no dependencies were added.
- The project has not yet been pushed to GitHub or deployed to Render. The uploaded Git metadata contains an `origin` remote for the existing repository, but no push or deployment action has been performed.
- The real `.env` was intentionally omitted. Create a local `.env` from `.env.example` and insert the correct MongoDB URI on the user's machine. Because an `.env` file was included in the uploaded archive, rotate its database password if it contained a live credential.

## Runtime commands

```powershell
npm install
Copy-Item .env.example .env
# Edit .env and set MONGO_URI before starting the application.
npm test
npm run dev
```

For Render use build command `npm install`, start command `npm start`, and configure `MONGO_URI` and `NODE_ENV=production` in the service environment settings. Render supplies `PORT` automatically.
