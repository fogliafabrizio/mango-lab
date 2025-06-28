# Fase 1: build Angular app
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build -- --configuration=production

FROM nginx:alpine
# copy your Angular build out of “browser”
COPY --from=builder /app/dist/mangolab-frontend/browser/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf
