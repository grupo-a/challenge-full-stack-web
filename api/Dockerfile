FROM node:18.17.1-alpine3.18


RUN apk add --no-cache curl wget git bash build-base


WORKDIR /usr/app

COPY package.json .

RUN npm install

RUN mkdir -p /usr/app/logs

COPY . /usr/app/

EXPOSE 3000 9229