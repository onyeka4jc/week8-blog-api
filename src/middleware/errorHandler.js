const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || "Internal server error";
  let details = err.details;

  // Normalize common parser and Mongoose errors in one place.
  if (err.type === "entity.parse.failed") {
    statusCode = 400;
    message = "Invalid JSON request body";
  } else if (err.type === "entity.too.large") {
    statusCode = 413;
    message = "Request body is too large";
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource identifier";
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Database validation failed";
    details = Object.values(err.errors || {}).map((item) => item.message);
  } else if (err.code === 11000) {
    statusCode = 409;
    message = "A record with this value already exists";
  }

  if (statusCode >= 500) {
    // Keep internal stack traces and database details out of API responses.
    console.error(err);
    message = "Internal server error";
  }

  const response = { message };
  if (Array.isArray(details) && details.length > 0) {
    response.details = details;
  }

  return res.status(statusCode).json(response);
};

module.exports = errorHandler;
