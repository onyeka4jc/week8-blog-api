# Assignment Submission Checklist

## Implementation
- [x] Refactor the Week 8 Blog API into the MVC-style project structure.
- [x] Use environment variables for deployment/runtime configuration.
- [x] Separate routes, controllers, models and middleware.
- [x] Add `.env.example`.
- [x] Add environment-variable validation.
- [x] Preserve existing article CRUD and search endpoints.
- [x] Add centralized error handling and automated tests.

## Before submission
- [ ] On the laptop, create `.env` from `.env.example` and set the actual MongoDB URI.
- [ ] Run `npm install` and `npm test` locally.
- [ ] Test MongoDB-backed create/list/search/read/update/delete operations in Postman.
- [ ] Commit and push the refactored project to the existing GitHub repository.
- [ ] Create/update the Render Web Service using `npm install` and `npm start`.
- [ ] Add `MONGO_URI` and `NODE_ENV=production` to Render environment settings.
- [ ] Confirm the deployed root endpoint and article endpoints work.
- [ ] Submit the GitHub repository URL and Render API URL.

The project is implemented and the offline tests pass. The unchecked items require access to the user's local MongoDB configuration, GitHub account and Render account and have not been performed here.
