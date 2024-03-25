# Stage 1: Local Development
FROM node:18 AS development
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
WORKDIR /usr/src/app
COPY --chown=node:node pnpm-lock.yaml ./
RUN pnpm fetch --prod
COPY --chown=node:node . .
RUN pnpm install --offline
RUN pnpm exec prisma generate
USER node

# Stage 2: Build
FROM node:18 AS build
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
WORKDIR /usr/src/app
COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node .env .env
COPY --chown=node:node . .
RUN pnpm build
ENV NODE_ENV production
RUN pnpm install --offline --prod
USER node

# Stage 3: Production
FROM node:18-alpine AS production
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
EXPOSE 4000
CMD [ "node", "dist/main.js" ]

