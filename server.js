const env = require("./src/config/env");
const mongoose = require("mongoose");
const connectDB = require("./src/config/db");
const app = require("./src/app");

let server;

const startServer = async () => {
  try {
    await connectDB();

    server = app.listen(env.port, "0.0.0.0", () => {
      console.log(`Server running in ${env.nodeEnv} mode on port ${env.port}`);
    });
  } catch (error) {
    console.error(`Application startup failed: ${error.message}`);
    process.exitCode = 1;
  }
};

const shutDown = (signal) => {
  console.log(`${signal} received. Shutting down gracefully...`);

  if (!server) {
    mongoose.disconnect().finally(() => process.exit(0));
    return;
  }

  server.close(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutDown("SIGTERM"));
process.on("SIGINT", () => shutDown("SIGINT"));

startServer();
