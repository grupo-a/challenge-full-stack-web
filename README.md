# Módulo Acadêmico - Grupo +A

Sistema Full Stack desenvolvido por Gabriel Neves, para gerenciamento de alunos (Matrícula, Edição, Consulta e Exclusão) com autenticação segura. Desenvolvido como parte do desafio técnico, focando em qualidade de código, segurança e experiência do usuário.

## Arquitetura da Solução

O projeto segue uma arquitetura **Client-Server** desacoplada (Monorepo), onde o Front-end e o Back-end operam independentemente, comunicando-se via API REST.

### Fluxo de Dados
`[Frontend (Vue.js)] <--> [API (Node.js/Express)] <--> [Banco de Dados (PostgreSQL)]`

* **Segurança:** Implementação de **JWT (JSON Web Token)**. O Frontend armazena o token e o envia em cada requisição; o Backend valida o token antes de liberar o acesso aos dados.
* **Frontend:** Single Page Application (SPA) reativa construída com Vue 3, TypeScript e Vuetify.
* **Backend:** API RESTful construída com Node.js e Express, utilizando driver nativo do Postgres (`pg`).

---

## Tecnologias Utilizadas

### Frontend (`/frontend`)
* **Vue.js 3** (Composition API + Script Setup)
* **TypeScript** (Tipagem estática e segurança)
* **Vuetify 3** (Biblioteca de componentes UI Material Design)
* **Vue Router 4** (Gerenciamento de rotas e guardas de navegação)
* **Axios** (Cliente HTTP com interceptadores)
* **Vite** (Build tool rápida)

### Backend (`/backend`)
* **Node.js**
* **Express** (Framework de servidor)
* **PostgreSQL** (Banco de dados relacional)
* **bcryptjs** (Hash de senhas)
* **jsonwebtoken** (Geração e validação de tokens)
* **cors** & **dotenv**

---

## Pré-requisitos

Certifique-se de ter instalado:
* [Node.js](https://nodejs.org/) (v16 ou superior)
* [PostgreSQL](https://www.postgresql.org/)
* [Git](https://git-scm.com/)

---
## Se tivesse mais tempo
1. Adicionaria mais funções ao administrador
- Criar cursos
- Criar matérias
- Alocar alunos em cursos e matérias
- Adicionar conteúdo
- Criar perfil do professor
2. Professores e alunos
- Matriculas em cursos
- Emissão de documento e certificados
- Edifar perfil (senha, foto...)