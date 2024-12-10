# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.1.38
FROM oven/bun:${BUN_VERSION}-slim AS base

LABEL fly_launch_runtime="Bun"

# Bun app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
  apt-get install --no-install-recommends -y build-essential pkg-config python-is-python3

# Copy application code
COPY . .
RUN bun install --ci
RUN bun --filter=@jm/server run build
RUN bun --filter=@jm/web run build

RUN mkdir -p ./dist/{server,web}
RUN cp -a ./packages/server/dist/. ./dist/server/
RUN cp -a ./packages/web/dist/. ./dist/web/

# Remove all files in frontend except for the dist folder
RUN rm -rf ./packages
RUN rm -rf ./node_modules
# RUN find . -mindepth 1 ! -regex '^./dist\(/.*\)?' -delete

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "bun", "run", "start" ]
