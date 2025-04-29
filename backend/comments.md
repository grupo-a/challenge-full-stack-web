# Documentação

## Informações Gerais

Este projeto foi desenvolvido em **Node.js** utilizando o banco de dados **PostgreSQL**, estruturado com foco em escalabilidade, qualidade de código e manutenção. Foram utilizados **testes unitários com Jest** e princípios de boas práticas de desenvolvimento como **SOLID**, separação de responsabilidades e injeção de dependências.

---

## Decisão da Arquitetura Utilizada: Clean Architecture (inspirada no padrão MVC)

A arquitetura adotada foi baseada no padrão **Clean Architecture**, promovendo uma separação clara entre responsabilidades da aplicação. A estrutura do projeto permite fácil manutenção, testes e escalabilidade.

**Camadas e Responsabilidades:**

- **Routes**: Responsável por mapear as requisições HTTP e direcionar para o controller adequado.
- **Middlewares**: Responsável por interceptar requisições para aplicar validações, autenticação e outras regras de acesso.
- **Controllers**: Responsável por lidar com a entrada do usuário (requisições), invocar os serviços necessários e retornar as respostas apropriadas.
- **Services**: Contém a lógica de negócio da aplicação. Separa o domínio da aplicação das camadas externas como banco de dados.
- **Repositories**: Responsável por lidar com a persistência de dados, abstraindo a lógica de acesso ao banco.
- **Models**: Representam os dados manipulados, podendo ser integrados com bibliotecas como Knex ou ORM.
- **Utils**: Contém funções auxiliares reutilizáveis, como geração de token JWT.
- **Config**: Contém configurações específicas como o arquivo `knexfile.js`.

Essa estrutura melhora a coesão, facilita testes e a evolução do sistema sem acoplamentos fortes.

---

## Lista de Bibliotecas de Terceiros Utilizadas:

- **bcrypt**: Criptografia de senhas para armazená-las de forma segura.
- **cors**: Liberação de acesso entre diferentes origens (Cross-Origin Resource Sharing).
- **dotenv**: Leitura de variáveis de ambiente a partir de arquivos `.env`.
- **express**: Framework web para criação de rotas e manipulação de requisições.
- **jsonwebtoken**: Geração e validação de tokens JWT para autenticação.
- **morgan**: Logger de requisições HTTP.
- **nodemon**: Reinicialização automática do servidor durante o desenvolvimento.
- **pg**: Cliente PostgreSQL para Node.js.
- **supertest**: Utilitário para testar endpoints HTTP.
- **jest**: Framework de testes unitários.
- **knex**: Query builder SQL para Node.js.

---

## Melhorias Futuras

- **Cache com Redis**: Para melhorar o desempenho em requisições repetidas.
- **Validações e regras de negócio robustas**: Para evitar cadastros inválidos ou inconsistentes.
- **Sistema de autenticação e permissões mais completo**: Com papéis e restrições por rota.
- **Filtros e validações avançadas nas requisições REST**.
- **Sistema de logs estruturados**: Para monitoramento e diagnóstico em produção.
- **Refinamento do schema de banco de dados**: Com índices e consultas otimizadas.
- **Integrações externas automatizadas**: Para acelerar cadastros e sincronização.
- **Retornos de erro mais claros e rastreáveis**: Para melhor experiência do usuário.

---

## Testes Unitários

Testes foram implementados utilizando **Jest** e **Supertest**, garantindo que os endpoints da aplicação funcionem corretamente e evitando regressões inesperadas.

---

## Executar o Projeto

### 1 - Instalar dependências:

```bash
npm install
```

### 2 - Executar testes unitários:

```bash
npm test tests/students.spec.js
```

### 3 - Subir o banco de dados com Docker Compose:

```bash
docker-compose up -d
```

> Isso iniciará um container PostgreSQL de acordo com a configuração do arquivo `docker-compose.yml`.

### 4 - Configurar variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto baseado no `.env_example`.

```bash
cp .env_example .env
```

> Ajuste as variáveis de ambiente conforme necessário, especialmente as de conexão com o banco (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, etc).

### 5 - Criar e aplicar as migrações com Knex:

```bash
npx knex migrate:latest --knexfile src/config/knexfile.js
npx knex seed:run --knexfile src/config/knexfile.js    
```

> Esse comando irá criar as tabelas no banco conforme os arquivos de migração definidos.

### 6 - Iniciar o servidor:

```bash
npm start
```

> O servidor estará disponível em: [http://localhost:3050](http://localhost:3050)

---