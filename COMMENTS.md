# COMMENTS.md

## Decisão da arquitetura utilizada

### Backend
Optei por uma arquitetura baseada em **Clean Architecture** e **Domain-Driven Design (DDD)**, organizada em módulos (`modules/`). Essa escolha facilita a manutenção e escalabilidade, separando claramente as responsabilidades:
- **Domain**: Contém as entidades e regras de negócio.
- **Application**: Contém os casos de uso (Use Cases) e interfaces de repositórios.
- **Infrastructure**: Implementações concretas (banco de dados, frameworks HTTP, etc).

Utilizei **Node.js** com **Express** pela simplicidade e robustez. Para o banco de dados, escolhi **PostgreSQL** com **Drizzle ORM**, que oferece segurança de tipos (type-safety) e ótima performance, além de facilitar as migrações.

### Frontend
O frontend foi desenvolvido com **Vue.js 3** utilizando a **Composition API** e **TypeScript**. A estrutura também é modular, espelhando o backend quando possível.
- **Vuetify**: Escolhido como biblioteca de componentes para acelerar o desenvolvimento da UI com um design limpo e responsivo.
- **Pinia**: Para gerenciamento de estado global, por ser a solução padrão e mais moderna para Vue.
- **Zod**: Para validação de esquemas e formulários, garantindo integridade dos dados antes do envio.

## Lista de bibliotecas de terceiros utilizadas

### Backend
- **express**: Framework web rápido e minimalista.
- **drizzle-orm**: ORM TypeScript para SQL.
- **pg**: Driver PostgreSQL.
- **zod**: Validação de esquemas e dados.
- **bcryptjs**: Hash de senhas.
- **jsonwebtoken**: Autenticação via JWT.
- **swagger-ui-express** / **swagger-jsdoc**: Documentação da API.
- **vitest**: Framework de testes unitários.

### Frontend
- **vue**: Framework JavaScript progressivo.
- **vuetify**: Framework de UI Material Design.
- **pinia**: Gerenciamento de estado.
- **vue-router**: Roteamento.
- **axios**: Cliente HTTP.
- **zod**: Validação de dados.
- **vue-toastification**: Notificações (Toasts).
- **vitest**: Testes unitários.

## O que você melhoraria se tivesse mais tempo
- **Testes E2E**: Implementaria testes de ponta a ponta com Cypress ou Playwright para garantir o fluxo completo da aplicação.
- **Cobertura de Testes**: Aumentaria a cobertura de testes unitários e de integração, especialmente no backend.
- **Matrícula em Turmas**: Implementaria o módulo de "Turmas" e a funcionalidade de matricular alunos nelas, expandindo o escopo para além do CRUD de alunos.
- **CI/CD**: Refinaria o pipeline de CI/CD para incluir deploy automático (CD) em um ambiente de staging.
- **Docker**: Otimizaria as imagens Docker para produção.

## Quais requisitos obrigatórios que não foram entregues
- **Matrícula do Aluno na Turma**: O desafio menciona "Realizar a Matrícula do Aluno na Turma" no objetivo, mas as Histórias de Usuário detalharam apenas o CRUD de Alunos. Foquei na entrega completa e robusta do CRUD de Alunos conforme os critérios de aceite explícitos, deixando a gestão de turmas como uma melhoria futura.
