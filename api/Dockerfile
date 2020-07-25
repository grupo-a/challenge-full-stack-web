FROM node:lts-alpine
WORKDIR /api
COPY package*.json ./
COPY . .
EXPOSE 8083
ENTRYPOINT [ "./init.sh" ]