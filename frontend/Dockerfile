# ---------------------------
# Stage 1: build Angular app
# ---------------------------
    FROM node:20 AS builder
    WORKDIR /app
    
    # copia solo package.json per sfruttare cache
    COPY package*.json ./
    RUN npm ci
    
    # copia tutto il resto e build
    COPY . .
    RUN npm run build -- --configuration=production
    
    
    # -----------------------------------
    # Stage 2: serve con Nginx pulito
    # -----------------------------------
    FROM nginx:alpine
    
    # 1) rimuovo i file statici di default
    RUN rm -rf /usr/share/nginx/html/*
    
    # 2) incollo SOLO la tua build browser/
    COPY --from=builder /app/dist/mangolab-frontend/browser/ /usr/share/nginx/html/
    
    # 3) sovrascrivo la conf per abilitare fallback SPA
    COPY default.conf /etc/nginx/conf.d/default.conf
    
    # (opzionale) espongo la porta 80
    EXPOSE 80
    