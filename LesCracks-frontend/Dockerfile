# === BUILD STAGE ===
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build  # /dist or /build depending on React/Vite

# === PRODUCTION STAGE ===
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy SPA nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
