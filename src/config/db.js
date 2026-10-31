const mongoose = require("mongoose");
const env = require("./env");

const connectDB = async () => {
  await mongoose.connect(env.mongoUri, {
    family: 4,
    serverSelectionTimeoutMS: 10000,
  });

  console.log("MongoDB connected successfully");
};

module.exports = connectDB;
