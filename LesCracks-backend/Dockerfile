# syntax=docker/dockerfile:1
ARG NODE_VERSION=22.14.0
FROM node:${NODE_VERSION}-alpine AS base

# Étape 1 : Dépendances (cache optimal)
FROM base AS deps
WORKDIR /usr/src/app

# Copie uniquement les fichiers de dépendances
COPY package.json package-lock.json ./

# Cache npm + install deps production
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Étape 2 : Build (si tu avais du build, ici non)
FROM base AS build
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

# Étape 3 : Runtime (léger)
FROM base AS final
WORKDIR /usr/src/app

# Copie node_modules + code
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app ./

# Crée le dossier uploads + droits
RUN mkdir -p uploads && chown -R node:node uploads

# Utilise un user non-root
USER node

# Port exposé
EXPOSE 5000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:5000/health || exit 1

# Démarre l'app
CMD ["npm", "start"]