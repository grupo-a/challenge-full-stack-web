FROM node:lts-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install -g @vue/cli
RUN npm install -g @vue/cli-service
COPY package*.json
RUN npm install
COPY . .
CMD ["npm", "run", "serve"]
