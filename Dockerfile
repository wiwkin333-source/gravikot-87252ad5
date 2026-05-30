# Этап сборки
FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g bun

COPY package.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# Показать что собралось
RUN echo "=== dist/server ===" && ls dist/server/ && echo "=== dist/server/assets ===" && ls dist/server/assets/

# Этап запуска
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY server-node.mjs ./

EXPOSE 80
CMD ["node", "server-node.mjs"]
