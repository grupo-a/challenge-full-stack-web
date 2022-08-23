FROM node
WORKDIR /usr/frontend
COPY package.json ./
RUN yarn global add @vue/cli
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "run", "serve"]
