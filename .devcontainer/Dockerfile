# Base image for this project's devcontainer
FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Install system-wide dependencies
USER root
# hadolint ignore=DL3008
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends git curl \
    && ARCH=$(dpkg --print-architecture) \
    && case ${ARCH} in \
        "amd64") HADOLINT_ARCH="x86_64" ;; \
        "arm64") HADOLINT_ARCH="arm64" ;; \
        *) echo "Unsupported architecture: ${ARCH}" && exit 1 ;; \
    esac \
    && curl -sL "https://github.com/hadolint/hadolint/releases/latest/download/hadolint-Linux-${HADOLINT_ARCH}" -o /usr/local/bin/hadolint \
    && chmod +x /usr/local/bin/hadolint \
    && case ${ARCH} in \
        "amd64") ZIZMOR_ARCH="x86_64-unknown-linux-gnu" ;; \
        "arm64") ZIZMOR_ARCH="aarch64-unknown-linux-gnu" ;; \
        *) echo "Unsupported architecture: ${ARCH}" && exit 1 ;; \
    esac \
    && curl -sL "https://github.com/zizmorcore/zizmor/releases/latest/download/zizmor-${ZIZMOR_ARCH}.tar.gz" | tar -xz -C /usr/local/bin/ \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Switch back to the non-root user
USER vscode