# Этап сборки
FROM node:20-alpine AS builder
WORKDIR /app

# Устанавливаем bun
RUN npm install -g bun

# Копируем зависимости
COPY package.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile

# Копируем весь код
COPY . .

# Собираем проект
RUN bun run build

# Этап раздачи через nginx
FROM nginx:alpine

# Удаляем дефолтный конфиг nginx
RUN rm /etc/nginx/conf.d/default.conf

# Копируем наш конфиг
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранный фронтенд
COPY --from=builder /app/dist/client /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
