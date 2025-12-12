
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@10.14.0 --activate

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

ENV DATABASE_URL="postgresql://user:password@postgres:5432/mydatabase"

RUN pnpm run db:generate || true

RUN pnpm run build

RUN mkdir -p swagger-dist && \
    find src -path "*/docs/*.ts" -exec cp --parents {} swagger-dist \;

FROM node:22-slim AS production

RUN corepack enable && corepack prepare pnpm@10.14.0 --activate

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile
RUN apt-get update -y && apt-get install -y openssl

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/swagger-dist/src ./src

COPY --from=builder /usr/src/app/drizzle.config.ts ./
COPY --from=builder /usr/src/app/src/common/infrastructure/database/drizzle/migrations ./src/common/infrastructure/database/drizzle/migrations

EXPOSE 3000

ENV NODE_ENV=production

CMD [ "sh", "-c", "pnpm run migrate && pnpm run start" ]
