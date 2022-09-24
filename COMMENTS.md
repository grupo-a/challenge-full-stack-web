## Decisão da arquitetura utilizada

Padrão semelhante a MVC, pois é o suficiente para um serviço basico como o do exemplo. Foi implementado injeção de dependencia com factory functions onde foi possível, visando facilitar os testes unitários e trazer alguns beneficios que o SOLID prega. Refaria utilizando Typescript, que ajudaria a aplicar alguns padrões mais robustos.

## Lista de bibliotecas de terceiros utilizadas

* bcrypt - Criptografar senha
* dotenv - Ler variaveis de ambiente
* jsonwebtoken - Autenticação sem estado (Stateless Authentication)
* pg - Postgres como banco de dados
* swagger-jsdoc - Documentação openAPI
* typeorm - ORM para o postgres
* winston - Logs
* zod - Validação de campos
* jest - Testes

#### Libs relacionadas a Lint/Padronizações/Dev/Api e etc.

* commitlint/cli
* commitlint/config-conventional
* eslint
* eslint-config-prettier
* eslint-plugin-prettier
* husky
* lint-staged
* nodemon
* prettier

## O que você melhoraria se tivesse mais tempo

Typescript, mais padrões de projeto e 100% de cobertura nos testes

## Quais requisitos obrigatórios que não foram entregues

Todos os obrigatorios foram entregues