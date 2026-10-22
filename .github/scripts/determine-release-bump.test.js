const test = require("node:test");
const assert = require("node:assert/strict");
const { determineReleaseBump } = require("./determine-release-bump");

const publishedAt = "2026-10-20T00:00:00Z";
const pullRequest = (labels, overrides = {}) => ({
  merged_at: "2026-10-21T00:00:00Z",
  user: { login: "contributor" },
  labels: labels.map((name) => ({ name })),
  ...overrides,
});

test("breaking changes select major even when smaller changes are present", () => {
  assert.equal(
    determineReleaseBump(
      [pullRequest(["Type: Feature"]), pullRequest(["Type: Breaking Change"])],
      publishedAt,
    ),
    "major",
  );
});

test("features select minor when there are no breaking changes", () => {
  assert.equal(
    determineReleaseBump(
      [pullRequest(["documentation"]), pullRequest(["enhancement"])],
      publishedAt,
    ),
    "minor",
  );
});

test("other and uncategorized included changes select patch", () => {
  assert.equal(
    determineReleaseBump(
      [pullRequest(["Type: Bug"]), pullRequest([])],
      publishedAt,
    ),
    "patch",
  );
});

test("release-excluded changes and changes merged before the latest release do not trigger a bump", () => {
  assert.equal(
    determineReleaseBump(
      [
        pullRequest(["Type: Breaking Change", "ignore-for-release"]),
        pullRequest(["Type: Feature"], { user: { login: "octocat" } }),
        pullRequest(["Type: Bug"], { merged_at: "2026-10-19T23:59:59Z" }),
      ],
      publishedAt,
    ),
    null,
  );
});
