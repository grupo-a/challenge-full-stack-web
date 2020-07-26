FROM node:lts-alpine
WORKDIR /app
RUN npm install -g @vue/cli
RUN npm install -g @vue/cli-service
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "serve"]
