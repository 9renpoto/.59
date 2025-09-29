# See https://github.com/microsoft/vscode-dev-containers/tree/v0.245.2/containers/docker-in-docker
FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Install system-wide dependencies
USER root
# hadolint ignore=DL3008
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends git curl unzip \
    && sh -c "$(curl -fsLS get.chezmoi.io/lb)" -- -b /usr/local/bin \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Switch to the non-root user to install user-specific tools
USER vscode

# Install bun
RUN curl -fsSL https://bun.sh/install | bash

# Add bun to the PATH
ENV PATH="/home/vscode/.bun/bin:${PATH}"