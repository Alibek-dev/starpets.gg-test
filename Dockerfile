FROM node:20.17.0-alpine

# Устанавливаем необходимые пакеты, такие как git
RUN apk add --no-cache git

# Устанавливаем переменные окружения
ENV NUXT_PORT=3009

# Делаем каталог 'app' текущим рабочим каталогом
WORKDIR /app

# Копируем оба 'package.json' и 'package-lock.json' (если он есть)
COPY package*.json ./

# Устанавливаем зависимости проекта с использованием npm
RUN npm install --ignore-scripts --prefer-offline --no-audit

# Устанавливаем простой HTTP-сервер для статики
RUN npm install --global http-server

# Копируем файлы и каталоги проекта в текущий рабочий каталог (т.е. в каталог 'app')
COPY . .

# Собираем приложение для production с минификацией
RUN npm run build

# Открываем порт 3009 для внешнего доступа
EXPOSE 3009

# Определяем команду по умолчанию для запуска контейнера
CMD ["http-server", "dist", "-p", "3009", "-g", "-b"]
