
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

COPY . .

ENV DATABASE_URL="postgresql://user:password@postgres:5432/mydatabase"

RUN npm run build

RUN mkdir -p swagger-dist && \
    find src -path "*/docs/*.ts" -exec cp --parents {} swagger-dist \;

FROM node:22-slim AS production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev --silent && npm cache clean --force
RUN apt-get update -y && apt-get install -y openssl

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/swagger-dist/src ./src

EXPOSE 3000

ENV NODE_ENV=production

CMD [ "sh", "-c", "npm run migrate && npm run start" ]
