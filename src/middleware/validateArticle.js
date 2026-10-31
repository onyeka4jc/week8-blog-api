const Joi = require("joi");

const articleSchema = Joi.object({
  title: Joi.string().min(5).trim().required(),
  content: Joi.string().min(20).trim().required(),
  author: Joi.string().trim().default("Guest"),
});

const validateArticle = (req, res, next) => {
  const { error, value } = articleSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const validationError = new Error("Article validation failed");
    validationError.statusCode = 400;
    validationError.details = error.details.map((detail) => detail.message);
    return next(validationError);
  }

  req.body = value;
  return next();
};

module.exports = validateArticle;
