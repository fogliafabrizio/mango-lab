# ---------------------------
# Stage 1: build Angular app
# ---------------------------
    FROM node:20 AS builder
    WORKDIR /app
    
    # 1) copia solo package.json per caching
    COPY package*.json ./
    RUN npm ci
    
    # 2) copia sorgente
    COPY . .
    
    # 3) arg per la configuration (default = production)
    ARG NG_BUILD_CONFIG=production
    
    # 4) build parametrico
    RUN npx ng build --configuration=$NG_BUILD_CONFIG

    
    # -----------------------------------
    # Stage 2: serve con Nginx pulito
    # -----------------------------------
    FROM nginx:alpine
    
    # 1) pulisco la cartella
    RUN rm -rf /usr/share/nginx/html/*
    
    # 2) copio la build
    COPY --from=builder /app/dist/mangolab-frontend/ /usr/share/nginx/html/
    
    # 3) fallback SPA
    COPY default.conf /etc/nginx/conf.d/default.conf
    
    EXPOSE 80
    