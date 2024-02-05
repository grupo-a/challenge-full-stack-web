FROM node:20.5.0-slim

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos do projeto para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos para o diretório de trabalho
COPY . .

# Configure o ambiente de produção
ENV NODE_ENV=production

# Exponha a porta em que a aplicação vai rodar
EXPOSE 3000