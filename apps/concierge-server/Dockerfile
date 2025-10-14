# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS base
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable
WORKDIR /app

# -------- deps (workspace-aware) --------
FROM base AS deps
# Root workspace manifests (IMPORTANT: include pnpm-workspace.yaml)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Service manifest so filter can resolve it early
COPY apps/concierge-server/package.json apps/concierge-server/package.json
# Install workspace deps (prod only to keep layer slim)
RUN pnpm install --frozen-lockfile --filter "concierge-server..." --prod

# -------- build --------
FROM base AS build
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/concierge-server/package.json apps/concierge-server/package.json
COPY apps/concierge-server/tsconfig.json apps/concierge-server/tsconfig.json
COPY apps/concierge-server/src apps/concierge-server/src
# Install full deps just for this workspace to build
RUN pnpm install --frozen-lockfile --filter "concierge-server..."
RUN pnpm --filter "concierge-server" run build
# Prune to prod deps for this workspace
RUN pnpm prune --prod --filter "concierge-server..."

# -------- runtime --------
FROM node:22-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
# copy built app + prod deps for this workspace
COPY --from=build /app/apps/concierge-server/dist ./dist
COPY --from=build /app/apps/concierge-server/package.json ./package.json
COPY --from=deps  /app/node_modules ./node_modules

EXPOSE 3333
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3333/health || exit 1

USER node
CMD ["node", "dist/server.js"]