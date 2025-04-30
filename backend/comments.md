# Documentação

## Informações Gerais

Este projeto foi desenvolvido em **Node.js** utilizando o banco de dados **PostgreSQL**, estruturado com foco em escalabilidade, qualidade de código e manutenção. Foram utilizados **testes unitários com Jest** e princípios de boas práticas de desenvolvimento como **SOLID**, separação de responsabilidades e injeção de dependências.

---

## Decisão da Arquitetura Utilizada: Clean Architecture

A arquitetura adotada foi baseada no padrão **Clean Architecture**, promovendo uma separação clara entre responsabilidades da aplicação. A estrutura do projeto permite fácil manutenção, testes e escalabilidade.

**Camadas e Responsabilidades:**

- **Domain (Domínio)**: Contém as entidades de negócio e interfaces de repositórios.
  - **Entities**: Representam os objetos de domínio com suas regras de validação.
  - **Repositories (Interfaces)**: Definem contratos para acesso a dados.

- **Application (Aplicação)**: Contém a lógica de negócio da aplicação.
  - **Services**: Implementam casos de uso e orquestram as operações de negócio.
  - **DTOs**: Objetos de transferência de dados entre camadas.

- **Infrastructure (Infraestrutura)**: Implementa interfaces definidas no domínio.
  - **Repositories (Implementações)**: Implementam o acesso a dados usando Knex.
  - **Database**: Configurações e migrações do banco de dados.

- **Interfaces**: Responsável pela comunicação com o mundo externo.
  - **Controllers**: Recebem requisições e delegam para os serviços apropriados.
  - **Routes**: Definem os endpoints da API.
  - **Middlewares**: Interceptam requisições para validação, autenticação, etc.

- **Utils**: Contém funções auxiliares reutilizáveis.
  - **Errors**: Classes personalizadas para tratamento de erros.
  - **Logger**: Sistema de logs estruturados.
  - **Swagger**: Documentação da API.

Esta estrutura melhora a coesão, facilita testes e a evolução do sistema sem acoplamentos fortes, seguindo os princípios SOLID:

- **S (Responsabilidade Única)**: Cada classe tem uma única responsabilidade.
- **O (Aberto/Fechado)**: Componentes são abertos para extensão, fechados para modificação.
- **L (Substituição de Liskov)**: Implementações podem ser substituídas sem afetar o comportamento.
- **I (Segregação de Interface)**: Interfaces específicas para cada necessidade.
- **D (Inversão de Dependência)**: Dependência de abstrações, não de implementações concretas.

---

## Lista de Bibliotecas de Terceiros Utilizadas:
- **cors**: Liberação de acesso entre diferentes origens (Cross-Origin Resource Sharing).
- **dotenv**: Leitura de variáveis de ambiente a partir de arquivos `.env`.
- **express**: Framework web para criação de rotas e manipulação de requisições.
- **helmet**: Proteção contra vulnerabilidades comuns de segurança.
- **jsonwebtoken**: Geração e validação de tokens JWT para autenticação.
- **knex**: Query builder SQL para Node.js.
- **morgan**: Logger de requisições HTTP.
- **pg**: Cliente PostgreSQL para Node.js.
- **swagger-jsdoc** e **swagger-ui-express**: Documentação interativa da API.
- **winston**: Sistema de logs estruturados.
- **nodemon**: Reinicialização automática do servidor durante o desenvolvimento.
- **jest**: Framework de testes unitários.
- **supertest**: Utilitário para testar endpoints HTTP.
- **eslint**: Ferramenta de análise estática para identificar padrões problemáticos.

---

## Melhorias Implementadas

- **Arquitetura Clean**: Separação clara entre camadas com responsabilidades bem definidas.
- **Injeção de Dependências**: Componentes recebem suas dependências via construtor.
- **Tratamento de Erros Avançado**: Hierarquia de erros personalizada com middleware centralizado.
- **Validação em Múltiplas Camadas**: Validação nas entidades e middlewares.
- **Documentação Swagger**: API totalmente documentada com interface interativa.
- **Logging Estruturado**: Sistema de logs com diferentes níveis e formatos.
- **CRUD Completo**: Implementação de todas as operações para estudantes.
- **Testes Abrangentes**: Testes unitários e de integração para todas as funcionalidades.
- **Segurança Aprimorada**: Middleware de autenticação robusto e proteções com Helmet.
- **Graceful Shutdown**: Tratamento adequado de sinais de encerramento.

---

## Melhorias Futuras

- **Cache com Redis**: Para melhorar o desempenho em requisições repetidas.
- **Autenticação Completa**: Sistema de registro e login de usuários.
- **Validação Avançada**: Implementação com bibliotecas como Joi ou Yup.
- **Containerização Completa**: Docker para ambiente de produção com múltiplos serviços.
- **CI/CD**: Integração e entrega contínuas com GitHub Actions ou similar.
- **Monitoramento**: Integração com ferramentas como Prometheus e Grafana.
- **Documentação Avançada**: Documentação técnica detalhada com JSDoc.
- **Internacionalização**: Suporte para múltiplos idiomas nas mensagens de erro.
- **Rate Limiting**: Proteção contra abusos na API.
- **Versionamento da API**: Suporte para múltiplas versões da API.

---

## Testes Unitários

Testes foram implementados utilizando **Jest** e **Supertest**, garantindo que os endpoints da aplicação funcionem corretamente e evitando regressões inesperadas. A cobertura de testes inclui:

- Testes de unidade para serviços e entidades
- Testes de integração para endpoints da API
- Testes de validação de dados
- Testes de autenticação

---

## Executar o Projeto

### 1 - Instalar dependências:

\`\`\`bash
npm install
\`\`\`

### 2 - Configurar variáveis de ambiente:

\`\`\`bash
cp .env_example .env
\`\`\`

> Ajuste as variáveis de ambiente conforme necessário, especialmente as de conexão com o banco (`DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`, etc).

### 3 - Subir o banco de dados com Docker Compose:

\`\`\`bash
docker-compose up -d
\`\`\`

> Isso iniciará um container PostgreSQL de acordo com a configuração do arquivo `docker-compose.yml`.

### 4 - Criar e aplicar as migrações com Knex:

\`\`\`bash
npm run migrate
npm run seed
\`\`\`

> Esse comando irá criar as tabelas no banco conforme os arquivos de migração definidos.

### 5 - Executar testes unitários:

\`\`\`bash
npm test
\`\`\`

### 6 - Iniciar o servidor:

\`\`\`bash
npm start
\`\`\`

> O servidor estará disponível em: [http://localhost:3050](http://localhost:3050)
> A documentação Swagger estará disponível em: [http://localhost:3050/api-docs](http://localhost:3050/api-docs)

---

## Estrutura de Diretórios

\`\`\`
src/
├── domain/                  # Camada de domínio
│   ├── entities/            # Entidades de negócio
│   └── repositories/        # Interfaces de repositórios
├── application/             # Camada de aplicação
│   └── services/            # Serviços de aplicação
├── infrastructure/          # Camada de infraestrutura
│   └── repositories/        # Implementações de repositórios
├── interfaces/              # Camada de interface
│   ├── controllers/         # Controladores
│   ├── middlewares/         # Middlewares
│   └── routes/              # Rotas da API
├── database/                # Configurações de banco de dados
│   ├── migrations/          # Migrações do Knex
│   └── seeds/               # Seeds para dados iniciais
├── utils/                   # Utilitários
│   ├── errors.js            # Classes de erro
│   ├── logger.js            # Configuração de logs
│   └── swagger.js           # Configuração do Swagger
├── config/                  # Configurações
│   └── knexfile.js          # Configuração do Knex
├── app.js                   # Configuração do Express
└── server.js                # Ponto de entrada da aplicação
\`\`\`

---

## Endpoints da API

A API oferece os seguintes endpoints:

- **GET /api/v1/students**: Lista todos os estudantes (com paginação e filtros)
- **GET /api/v1/students/:id**: Obtém um estudante específico
- **POST /api/v1/students**: Cria um novo estudante
- **PUT /api/v1/students/:id**: Atualiza um estudante existente
- **DELETE /api/v1/students/:id**: Remove um estudante

Todos os endpoints requerem autenticação via token JWT no cabeçalho `Authorization: Bearer {token}`.

Para mais detalhes, consulte a documentação Swagger disponível em `/api-docs`.

---
