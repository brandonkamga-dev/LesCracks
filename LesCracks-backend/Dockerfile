#syntax=docker/dockerfile:1

ARG NODE_VERSION=22-alpine
FROM node:${NODE_VERSION} AS base

# Dépendances production uniquement
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --legacy-peer-deps

# Build (pas besoin ici, mais on garde la structure)
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Image finale légère
FROM base
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app ./

# Dossier uploads + permissions
RUN mkdir -p uploads && chown -R node:node uploads

USER node
EXPOSE 5000

# Healthcheck cohérent avec ton API
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

CMD ["node", "src/server.js"]   # ou "npm start" si tu préfères