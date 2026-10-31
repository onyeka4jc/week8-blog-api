const { test } = require("node:test");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");

const runEnvCheck = (extraEnv = {}, removeMongoUri = false) => {
  const env = { ...process.env, ...extraEnv };
  if (removeMongoUri) delete env.MONGO_URI;

  return spawnSync(
    process.execPath,
    ["-e", "try { const c = require('./src/config/env'); console.log(JSON.stringify({port:c.port,nodeEnv:c.nodeEnv})); } catch (e) { console.log(e.message); process.exitCode = 1; }"],
    { cwd: projectRoot, env, encoding: "utf8" }
  );
};

test("environment config applies safe defaults when required values exist", () => {
  const result = runEnvCheck({
    MONGO_URI: "mongodb://127.0.0.1:27017/blog_api_test",
    NODE_ENV: "test",
    PORT: "5050",
  });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /\"port\":5050/);
  assert.match(result.stdout, /\"nodeEnv\":\"test\"/);
});

test("environment config fails clearly when MONGO_URI is missing", () => {
  const result = runEnvCheck({ NODE_ENV: "test", PORT: "5050" }, true);
  assert.notEqual(result.status, 0);
  assert.match(result.stdout, /MONGO_URI/);
  assert.doesNotMatch(result.stdout, /mongodb:\/\//);
});

test("environment config rejects an invalid PORT", () => {
  const result = runEnvCheck({
    MONGO_URI: "mongodb://127.0.0.1:27017/blog_api_test",
    NODE_ENV: "test",
    PORT: "70000",
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stdout, /PORT/);
});
