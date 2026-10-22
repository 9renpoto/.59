const EXCLUDED_LABEL = "ignore-for-release";
const EXCLUDED_AUTHOR = "octocat";

function determineReleaseBump(pullRequests, latestReleasePublishedAt) {
  if (!latestReleasePublishedAt) {
    throw new Error("The latest release must have a published_at timestamp");
  }

  const latestReleaseTime = Date.parse(latestReleasePublishedAt);
  const includedPullRequests = pullRequests.filter((pullRequest) => {
    if (
      !pullRequest.merged_at ||
      Date.parse(pullRequest.merged_at) <= latestReleaseTime
    ) {
      return false;
    }

    if (pullRequest.user?.login === EXCLUDED_AUTHOR) {
      return false;
    }

    return !pullRequest.labels.some((label) => label.name === EXCLUDED_LABEL);
  });

  if (includedPullRequests.length === 0) {
    return null;
  }

  const labels = new Set(
    includedPullRequests.flatMap((pullRequest) =>
      pullRequest.labels.map((label) => label.name),
    ),
  );

  if (labels.has("Type: Breaking Change")) {
    return "major";
  }

  if (labels.has("Type: Feature") || labels.has("enhancement")) {
    return "minor";
  }

  return "patch";
}

module.exports = { determineReleaseBump };
