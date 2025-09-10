# See https://github.com/microsoft/vscode-dev-containers/tree/v0.245.2/containers/docker-in-docker
FROM mcr.microsoft.com/devcontainers/base:ubuntu-22.04

# Install Node.js, pre-commit, cspell, and secretlint
USER root
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends nodejs npm python3-pip \
    && pip3 install pre-commit \
    && npm install -g cspell@^6.14.3 @secretlint/secretlint-rule-preset-recommend@^5.0.1 secretlint@^5.0.3 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Switch back to the non-root user
USER vscode
