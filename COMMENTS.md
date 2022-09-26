## Decisão da arquitetura utilizada

Padrão semelhante a MVC, pois é o suficiente para um serviço básico como o do exemplo. Foi implementado injeção de dependência com factory functions onde foi possível, visando facilitar os testes unitários e trazer alguns benefícios que o SOLID prega. Refaria utilizando Typescript, que ajudaria a aplicar alguns padrões mais robustos.

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

* Typescript e consequentemente padrões de projeto mais elaborados devido as vantagens fornecidas pelo TS. 

* Apesar de estar satisfeito com a padronização e organização do código, sinto que alguns detalhes como a ordem das importações ou desestruturações das dependências em alguns arquivos poderiam estar melhor ordenadas, facilitando ainda mais a leitura do código.

* Maior padronização nos testes e melhor organização dos Mocks utilizados no teste. A ideia era organiza-los de tal maneira que poderia se entender com clareza o sistema apenas olhando os testes e mocks, funcionando como uma documentação técnica da implementação.

## Quais requisitos obrigatórios que não foram entregues

Todos os obrigatórios e desejáveis foram entregues