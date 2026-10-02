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
    return res.status(400).json({
      message: "Validation failed",
      errors: error.details.map((detail) => detail.message),
    });
  }

  req.body = value;
  next();
};

module.exports = validateArticle;