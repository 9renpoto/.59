const test = require("node:test");
const assert = require("node:assert/strict");
const { determineReleaseBump } = require("./determine-release-bump");

const pullRequest = (sha, labels, overrides = {}) => ({
  merge_commit_sha: sha,
  merged_at: "2026-10-21T00:00:00Z",
  user: { login: "contributor" },
  labels: labels.map((name) => ({ name })),
  ...overrides,
});

test("breaking changes select major even when smaller changes are present", () => {
  assert.equal(
    determineReleaseBump(
      [
        pullRequest("feature", ["Type: Feature"]),
        pullRequest("breaking", ["Type: Breaking Change"]),
      ],
      new Set(["feature", "breaking"]),
    ),
    "major",
  );
});

test("features select minor when there are no breaking changes", () => {
  assert.equal(
    determineReleaseBump(
      [
        pullRequest("documentation", ["documentation"]),
        pullRequest("feature", ["enhancement"]),
      ],
      new Set(["documentation", "feature"]),
    ),
    "minor",
  );
});

test("other and uncategorized included changes select patch", () => {
  assert.equal(
    determineReleaseBump(
      [pullRequest("bug", ["Type: Bug"]), pullRequest("other", [])],
      new Set(["bug", "other"]),
    ),
    "patch",
  );
});

test("release-excluded changes and commits outside the tag range do not trigger a bump", () => {
  assert.equal(
    determineReleaseBump(
      [
        pullRequest("excluded-label", [
          "Type: Breaking Change",
          "ignore-for-release",
        ]),
        pullRequest("excluded-author", ["Type: Feature"], {
          user: { login: "octocat" },
        }),
        pullRequest("before-tag", ["Type: Bug"]),
      ],
      new Set(["excluded-label", "excluded-author"]),
    ),
    null,
  );
});

test("commits merged after the release tag count even if publication happens later", () => {
  assert.equal(
    determineReleaseBump(
      [pullRequest("merged-between-tag-and-publication", ["Type: Bug"])],
      new Set(["merged-between-tag-and-publication"]),
    ),
    "patch",
  );
});
