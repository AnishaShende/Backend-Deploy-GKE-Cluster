FROM node:22.17.0-alpine

RUN apk add --no-cache openssl git bash

# Create group and modify existing node user to match Kubernetes security context
RUN addgroup -g 3000 appgroup && \
    adduser node appgroup

WORKDIR /app

# Copy package files
COPY package.json .
COPY yarn.lock .

# Install all dependencies (including dev dependencies for build)
RUN yarn install --frozen-lockfile

# Copy source code and configuration files
COPY . .

# Generate necessary files and build
RUN yarn generate:swagger-docs && \
    yarn generate:prisma-client && \
    yarn build

# Remove all dependencies and reinstall only production dependencies
RUN rm -rf node_modules && \
    yarn install --production --frozen-lockfile

# Remove unnecessary files to reduce image size
RUN rm -rf src tests

# Switch to non-root user
USER node

EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.preview.sh"]