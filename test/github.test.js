// The regression test a maintainer would write for this report:
// "The OAuth authorize redirect leaks the app's client_secret in the URL."
const test = require("node:test");
const assert = require("node:assert");
const GitHub = require("../app/services/github");

test("authorization_url never contains the client secret", () => {
  const github = new GitHub({ client_id: "my-client-id", client_secret: "my-client-secret" });
  const url = github.authorization_url("public_repo");
  assert.ok(!url.includes("my-client-secret"), `secret leaked in redirect URL: ${url}`);
});

test("authorization_url still carries client_id and scope", () => {
  const github = new GitHub({ client_id: "my-client-id", client_secret: "my-client-secret" });
  const url = github.authorization_url("public_repo");
  assert.ok(url.includes("client_id=my-client-id"));
  assert.ok(url.includes("scope=public_repo"));
});
