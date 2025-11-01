## Multi-stage build: build Vite app, then serve with NGINX

# ----- Build stage -----
    FROM node:20-alpine AS builder
    WORKDIR /app
    
    # Install deps first (better cache)
    COPY package.json package-lock.json ./
    RUN npm ci --no-audit --no-fund
    
    # Copy sources and build
    COPY . .
    RUN npm run build
    
    # ----- Runtime stage -----
    FROM nginx:1.27-alpine
    
    # Copy custom nginx config
    COPY nginx.conf /etc/nginx/nginx.conf
    
    # Создать директорию для SSL сертификатов
    RUN mkdir -p /etc/nginx/ssl
    
    # Copy build to path expected by nginx.conf (root /usr/share/nginx/html/kvl)
    RUN mkdir -p /usr/share/nginx/html/kvl
    COPY --from=builder /app/dist/ /usr/share/nginx/html/kvl/
    
    EXPOSE 80 443
    CMD ["nginx", "-g", "daemon off;"]