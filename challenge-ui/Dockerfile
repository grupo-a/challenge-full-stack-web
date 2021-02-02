FROM node:lts-alpine

# Install basic http server for our UI
RUN npm install -g http-server

# Define app workdir
WORKDIR /app

# Copy package.json
COPY package*.json ./

# Install projects dependencies
RUN npm install

# Copy all files to workdir
COPY . .

# Finally compile our UI and serve the assets
RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]