const mongoose = require("mongoose");

const validateObjectId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    const error = new Error("Invalid article ID");
    error.statusCode = 400;
    return next(error);
  }

  return next();
};

module.exports = validateObjectId;
