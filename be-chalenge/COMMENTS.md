### Decisão da arquitetura

Software é uma entidade que se encontra quase constantemente sendo modificado. Tais mudanças ocorrem devido à necessidade de corrigir erros existentes no software ou de adicionar novos recursos e funcionalidades. Igualmente, os sistemas computacionais (isto é, aqueles que têm software como um de seus elementos) também estão sujeito a mudanças frequentes. Isso pode motivar um sistema de software a se tornar ‘não confiável’ e predisposto a defeitos, bem como ocasionar atraso na entrega e elevação de custos acima do estimado. Com isso foi utilizado uma arquitetura que define e separa bem as partes do código para que em manutenções futuras seja de fácil compreensão para novos desenvolvedores e também para o time existente. Consistindo no uso de Typescript onde o JS é tipado tornando o código mais confiável e menos sucetivel a erros. Também utizado o pattern de Repositories fornecido pelo ORM para servir de abstração para persistência dos dados.

### Bibliotecas utilizadas

| Nome              | Versão   | Descrição                                                                                                                                                                                           |
| ----------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| @babel/core       | ^7.12.3  | Babel compiler core.                                                                                                                                                                                |
| @babel/preset-env | ^7.12.1  | Is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s). |
| @types/express    | ^4.17.9  | This package contains type definitions for Express.                                                                                                                                                 |
| @types/jest       | ^26.0.15 | This package contains type definitions for Jest.                                                                                                                                                    |
| @types/mocha      | ^8.0.4   | This package contains type definitions for mocha                                                                                                                                                    |
| babel-jest        | ^26.6.3  | Jest plugin to use babel for transformation.                                                                                                                                                        |
| body-parser       | ^1.19.0  | Node.js body parsing middleware. Parse incoming request bodies in a middleware before your handlers, available under the req.body property.                                                         |
| compression       | ^1.7.4   | Node.js compression middleware.                                                                                                                                                                     |
| cors              | ^2.8.5   | CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.                                                                          |
| dotenv            | ^8.2.0   | Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.                                                                                              |
| express           | ^4.17.1  | Fast, unopinionated, minimalist web framework for node.                                                                                                                                             |
| mocha             | ^8.2.1   | Simple, flexible, fun JavaScript test framework for Node.js & The Browser.                                                                                                                          |
| pg                | ^8.5.1   | PostgreSQL client - pure javascript & libpq with the same API.                                                                                                                                      |
| ts-node           | ^9.0.0   | TypeScript execution environment and REPL for node.js, with source map support.                                                                                                                     |
| typeorm           | ^0.2.29  | Data-Mapper ORM for TypeScript, ES7, ES6, ES5. Supports MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, MongoDB databases.                                                               |
| typescript        | ^4.0.5   | TypeScript is a language for application scale JavaScript development.                                                                                                                              |
|reflect-metadata | ^0.1.13| reflect-metadata allows you to do runtime reflection on types. The native (non reflect-metadata) version of type inference is much poorer than reflect-metadata and consists only of typeof and instanceof. |

### Endpoints

| Method | Endpoint      | Description            |
| ------ | ------------- | ---------------------- |
| GET    | /students     | List all students      |
| GET    | /students/:id | List one student by id |
| PATCH  | /students/:id | Update one student     |
| POST   | /students     | Creates a new student  |
| DELETE | /students/:id | Delete one student     |

## Rodando o projeto

### Configuração

Crie um arquivo chamado ".env" na raiz do projeto.

O arquivo necessita das seguintes variaveis:

```
#APPLICATION
PORT=2500 #Porta que a aplicação ouvirá as requisições HTTP.

#DATABASE
DB_TYPE=postgres # Banco usado foi o postgres então utilizar o mesmo.
DB_HOST=localhost # Host que a intancia do banco está executando.
DB_PORT=15432 # Porta que o banco está executando.
DB_USER=root # Usuário do banco de dados.
DB_PASS=root # Senha do banco de dados.
DB_NAME=edtech # Nome do banco de dados.

```

Após esses passos:

```
npm install
```

#### Build
Como no projeto foi utilizado typescript, primeiro é preciso transpilar o código.

Executar o comando:

```
npm run build
```

Agora podemos rodar o projeto com o comando:

```
npm start
```

Obs.: Pra qualquer modificação feita no código é necessário fazer a transpilação novamente seguindo os passos a partir de Build.

Se tudo estiver correto, com a conexão do banco funcionando, será mostrado uma mensagem no console dizendo que o projeto está
rodando na porta que você definiu no arquivo ".env". Se não for especificado uma porta será utilizado a porta padrão 3000.

Para executar os testes unitários execute o comando:

```
npm run test
```