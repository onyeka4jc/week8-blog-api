const { before, after, test } = require("node:test");
const assert = require("node:assert/strict");
const app = require("../src/app");

let server;
let baseUrl;

before(async () => {
  server = app.listen(0, "127.0.0.1");
  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  if (server) {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});

test("GET / returns the API status", async () => {
  const response = await fetch(baseUrl);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.status, "ok");
  assert.match(body.message, /Blog API is running/);
});

test("unknown routes return 404 JSON", async () => {
  const response = await fetch(`${baseUrl}/not-a-route`);
  const body = await response.json();
  assert.equal(response.status, 404);
  assert.match(body.message, /Route not found/);
});

test("invalid article payload is rejected before database access", async () => {
  const response = await fetch(`${baseUrl}/articles`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ title: "Bad", content: "Too short" }),
  });
  const body = await response.json();
  assert.equal(response.status, 400);
  assert.equal(body.message, "Article validation failed");
  assert.ok(Array.isArray(body.details));
  assert.ok(body.details.length >= 2);
});

test("invalid article ID is rejected before database access", async () => {
  const response = await fetch(`${baseUrl}/articles/not-an-object-id`);
  const body = await response.json();
  assert.equal(response.status, 400);
  assert.equal(body.message, "Invalid article ID");
});

test("malformed JSON receives a controlled 400 response", async () => {
  const response = await fetch(`${baseUrl}/articles`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{not-json}",
  });
  const body = await response.json();
  assert.equal(response.status, 400);
  assert.equal(body.message, "Invalid JSON request body");
});
