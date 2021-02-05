## Instruções para rodar o projeto

- Certifique-se que possui instalado no seu computador o docker e o docker-compose
- Na raiz do projeto execute o comando: docker-compose up -d --build

Acesse http://localhost:4000
**Usuário:** admin
**Senha:** 12345678

O acesso ao banco de dados se dá pela porta **5433** e a api a pela porta **9000**

**Usuário do banco:** postgres
**Senha:** godzilla
**Nome do banco:** challenge
**Host:** localhost

## Arquitetura

A API foi desenvolvida utilizando a arquitetura MVC, foi tulizado o ORM Sequelizer para gerenciar os modelos de banco de dados e foi implementada uma camada de autenticação para proteger as API's.

### Estrutura

A aplicação foi completamente "dockerizada", na raiz está o arquivo de instruções docker-compose.yml, responsável por construir e criar os containers da aplicação.

- challenge-ui: Interface do usuário desenvolvida em Vue/Vuetfy
- challenge-api: API da aplicação desenvolvida em expressJS
- challenge-db: Banco de dados postgres, nesta pasta está também o dump do banco que é executado durante a criação do container

## Bibliotecas de terceiros

#### API
- express
- express-validator
- body-parser
- cors
- bcrypt
- jsonwebtoken
- pg
- sequelize
- tape

#### UI
- vuetfy
- axios
- vue-router

Obs: No package.json tanto da UI quanto da API pode ser que haja mais bibliotecas, algumas delas utilizei para testes de recursos que não consegui implementar a tempo.

## O que eu melhoraria se tivesse mais tempo

#### API
- Abusaria mais de testes unitários, cheguei a instalar a biblioteca tape e fiz alguns testes, mas ocorreram alguns erros ao tentar simular as chamadas de API com esta biblioteca, devido ao tempo não consegui explorar mais o problema, mas cheguei a rodar alguns testes nos models.
- Utilizaria uma camada de repositórios para desafogar os controllers das operações com o DB.
- Implementaria migrations e seeders ao invés de criar as tabelas e popular o banco pelo docker, cheguei a tentar implementar mas eu cometi um erro, deveria ter criado os models pela CLI do Sequelize, que já cria os migrations e seeders automaticamente. A dificuldade de criar os migrations e seeders com a estrutura do banco e modelos já prontos é maior e oneraria mais tempo.