FROM node:20.5.0-slim

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Install dockerize
RUN apt-get update && apt-get install -y wget && \
    wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz && \
    tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz && \
    rm dockerize-linux-amd64-v0.6.1.tar.gz

# Copie os arquivos do projeto para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install && npm install --global pm2

# Copie o restante dos arquivos para o diretório de trabalho
COPY . .

# Exponha a porta em que a aplicação vai rodar
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["dockerize", "-wait", "tcp://db:3306", "-timeout", "100s", "npm", "run", "start:docker"]