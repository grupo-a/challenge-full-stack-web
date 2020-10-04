FROM node:current-slim
RUN mkdir -p /usr/server && chown -R node:node /usr/server
WORKDIR /usr/server
COPY package* dist ".env" ./
USER node 
RUN npm ci
RUN ls
EXPOSE 3000
CMD [ "node", "main.js" ]