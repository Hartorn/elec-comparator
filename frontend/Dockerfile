FROM node:current-alpine AS base

FROM base AS dev

ARG USERNAME=llm
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Create a group and user
# Add sudo for setup (copy and ownership of files)
# Ensure there is no prompt for using sudo
RUN deluser node && \
    adduser ${USERNAME} -u ${USER_UID} -D && \
    apk add --no-cache sudo && rm  -rf /var/cache/apk/* && \
    echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME && \
    chmod 0440 /etc/sudoers.d/$USERNAME

# Set user
USER $USERNAME
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -
ENV PNPM_HOME="/home/${USERNAME}/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
