FROM node:14.18.0-alpine3.14

RUN apk add --no-cache git

USER node

WORKDIR /home/node/app

COPY . .
