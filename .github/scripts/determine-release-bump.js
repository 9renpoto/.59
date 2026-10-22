const EXCLUDED_LABEL = "ignore-for-release";
const EXCLUDED_AUTHOR = "octocat";

function determineReleaseBump(pullRequests, releaseCommitShas) {
  const includedPullRequests = pullRequests.filter((pullRequest) => {
    if (
      !pullRequest.merged_at ||
      !releaseCommitShas.has(pullRequest.merge_commit_sha)
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
