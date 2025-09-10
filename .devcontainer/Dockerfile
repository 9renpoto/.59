# See https://github.com/microsoft/vscode-dev-containers/tree/v0.245.2/containers/docker-in-docker
FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04

# hadolint-disable=DL3008
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
# Install Node.js, pre-commit, cspell, and secretlint
USER root
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends nodejs=18.17.1-1nodesource1 npm=9.6.7-1nodesource1 python3-pip=22.0.2+dfsg-1ubuntu0.4 \
    && pip3 install pre-commit==3.3.3 \
    && npm install -g cspell@^6.14.3 @secretlint/secretlint-rule-preset-recommend@^5.0.1 secretlint@^5.0.3 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Switch back to the non-root user
USER vscode
