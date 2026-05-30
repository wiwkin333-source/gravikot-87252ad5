# Этап сборки
FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g bun

COPY package.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# Этап запуска — Node.js раздаёт статику
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/dist/client ./dist/client
COPY server-node.mjs ./

EXPOSE 80
CMD ["node", "server-node.mjs"]
