# Base image for this project's devcontainer
FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Install system-wide dependencies
USER root
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends git curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Switch back to the non-root user
USER vscode