# === BUILD STAGE ===
FROM node:22-alpine AS builder
WORKDIR /app

# Copie seulement les fichiers de dépendances → permet le cache
COPY package*.json ./

# LA LIGNE MAGIQUE QUI DIVISE LE TEMPS PAR 10
RUN --mount=type=cache,target=/root/.npm \
    npm ci --prefer-offline --no-audit --no-fund

# Copie le reste du code
COPY . .

# Build final
RUN npm run build

# === PRODUCTION STAGE ===
FROM nginx:alpine

# Supprime la config par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Copie le build
COPY --from=builder /app/dist /usr/share/nginx/html

# Copie ta config nginx SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80