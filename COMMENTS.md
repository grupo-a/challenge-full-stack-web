# +A Educação - Full Stack Web Developer

## Objetivos

Desenvolver um sistema utilizando Node JS e Vue JS, ambos com typescript, que permita o gerenciamento do cadastro de alunos.

## Arquitetura utilizada

O sistema foi desenvolvido utilizando alguns conceitos de CleanArch e SOLID.

### Backend

A api do sistema foi desenvolvido em Node JS. As seguintes bibliotecas foram utilizadas:

- express - Rotear as rotas
- prisma - ORM para manipular o banco de dados
- bcrypt - Criptografia das senhas dos usuários
- cors - Configurações de clientes(consumidores) da API
- yup - Validação dos dados nas rotas
- jsonwebtoken - Autenticação do usuário
- vitest - Testes unitários

### Banco de Dados

O banco de dados utilizado foi o Postgres através de uma imagem docker.

### Frontend

O frontend foi desenvolvido com Vue JS. As seguintes bibliotecas foram utilizadas:

- axios - Fazer requisições para o server
- pinia - Armazenamento e gerenciamento de estado na aplicação
- vue-router - Rotear as páginas

## :rocket: Como executar o projeto

Podemos considerar este projeto como sendo divido em duas partes:

- Backend (pasta server)
- Frontend (pasta web)

💡O Frontend precisa que o Backend esteja sendo executado para funcionar.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: [Git](https://git-scm.com), [Docker](https://www.docker.com/) e o [Node.js](https://nodejs.org/).
Além disto é bom ter um editor para trabalhar com o código como o [VSCode](https://code.visualstudio.com/).</p>

### 🎲 Rodando o Backend (servidor)

```bash
# Clone este repositório
$ git clone https://github.com/ViniciusCCO/challenge-full-stack-web

# Acesse a pasta do projeto no terminal/cmd
$ cd challenge-full-stack-web

# Suba o banco de dados
$ docker compose -f ./docker-compose-postgres.yml up -d

# Vá para a pasta server
$ cd server

# Instale as dependências
$ npm install

# Será necessário criar um arquivo de variáveis ambientes na raiz do servidor
```

### 💻 Configurando Variáveis Ambientes

É preciso informar duas variáveis ambientes para que a aplicação funcione: A String de conexão para o banco de dados, e o segredo utilizado para tornar a autenticação da aplicação única (pode ser qualquer valor aleatório).
Crie um arquivo chamado ".env" na raiz do projeto, e coloque as seguintes informações:

```
DATABASE_URL="postgresql://root:postgres@localhost:5432/postgres"

JWT_SECRET=SEGREDO
```

### 💻 Continuando Com a Execução

```bash

# Crie o banco de dados
$ npx prisma migrate dev

# Execute a aplicação
$ npm run dev

# O servidor inciará na porta:3333 - acesse http://localhost:3333 ou http://localhost:3333/docs/ para ver quais rotas estão disponíveis
```

### 🧭 Rodando a aplicação web (Frontend)

```bash
# Abra um novo terminal na pasta raiz do projeto, e entre na pasta web
$ cd web

# Instale as dependências
$ npm install

# Execute a aplicação
$ npm run dev

# A aplicação será aberta na porta:5173 - acesse http://localhost:5173
```

## Possíveis melhorias

Todos os requisitos foram realizados. Mas ainda assim seria possível melhorar a aplicação.

### Backend

- Implementar refresh token
- Implementar biblioteca para lidar com as injeções de dependências e singletons

### Frontend

- Criar uma interface mais bonita usando o framework Vuetify
- Melhorar a segurança e o gerenciamento da autenticação da aplicação, utilizando armazenamentos de estados para verificar se o token é válido
- Tratamentos de erros mais informativos, como redirecionar o usuário para uma página de erro se o mesmo não estiver autenticado

### Aplicação em geral

- Rodar o banco de dados, o backend e o frontend pelo docker compose
- Fazer deploy da aplicação

Feito com ❤️ por Vinicius Amorim 👋🏽 [Entre em contato!](https://www.linkedin.com/in/vinicius-amorim-6505/)
