<h1>Api para o desafio fullstack</h1>

<h2>Como executar o projeto</h2>
<h3>Requisitos</h3>
Será necessário possuir instalado na máquina os seguintes componentes:

- Node : 23.x.x
- Yarn/Npm
- Docker
- Docker-Compose

<h3>Instalando dependências do projeto</h3>

Via terminal, navegue até a pasta criada, onde foi depositado o clone do projeto, e execute o comando `yarn`. Todas as dependências do projeto serão instaladas.

<h3>Preparando o banco de dados</h3>

Ainda no terminal execute o comando `docker-compose up -d` para instanciar o banco de dados Postgres.

Uma vez que os container tenham sido criados, execute o comando `yarn start:dev` no seu terminal. Isto irá criar todos os objetos de banco de dados necessários para o funcionamento da API. Isso inclui o primeiro usuário administrativo do sistema:

<h3>Executando o projeto</h3>

Com todas as dependências resolvidas, ao executar o comando de inicialização você poderá acessá-la através da url http://localhost:3000

<h3>Executando os testes</h3>

Para executar os testes e os testes de cobertura execute `yarn test` ou `yarn test:cov`, a cobertura de testes foi feita apenas com as services.

<h3>Utilizando a API</h3>

O primeiro passo é acessar o usuário com as credenciais:

User: admin@admin.com
Pass: admin123

Caso acessado via postman ou outra ferramenta será necessário colocar o método de autenticação `Bearar` e adicionar o token passado pela api.

<h3>Rotas da API</h3>

Para acessar a documentação basta inicializar o sistema e acessar o caminho `http://localhost:3000/docs`

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
