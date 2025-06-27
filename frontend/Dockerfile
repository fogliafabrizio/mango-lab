# Fase 1: build Angular app
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build -- --configuration=production

# Fase 2: serve con Nginx
FROM nginx:alpine
COPY --from=builder /app/dist/mangolab-frontend /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
