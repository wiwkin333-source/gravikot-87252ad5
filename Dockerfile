FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g bun

COPY package.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

RUN echo "=== index.js content ===" && cat dist/server/index.js

FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY server-node.mjs ./

EXPOSE 80
CMD ["node", "server-node.mjs"]
