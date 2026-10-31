const dotenv = require("dotenv");
const Joi = require("joi");

// Load local variables from .env. Render supplies environment variables directly.
dotenv.config();

const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "test", "production")
    .default("development"),
  PORT: Joi.number().integer().min(1).max(65535).default(5000),
  MONGO_URI: Joi.string()
    .trim()
    .uri({ scheme: ["mongodb", "mongodb+srv"] })
    .required(),
}).unknown(true);

const { value, error } = envSchema.validate(process.env, {
  abortEarly: false,
  convert: true,
});

if (error) {
  // Report variable names only. Never print connection strings or credentials.
  const invalidVariables = [
    ...new Set(error.details.map((detail) => detail.path[0] || "environment")),
  ];
  throw new Error(
    `Environment configuration is invalid. Check: ${invalidVariables.join(", ")}`
  );
}

module.exports = Object.freeze({
  nodeEnv: value.NODE_ENV,
  port: value.PORT,
  mongoUri: value.MONGO_URI,
});
