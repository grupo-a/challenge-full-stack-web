# Decisão da Arquitetura Utilizada

O projeto foi organizado em duas partes principais:

- **api/**: Contém o backend, responsável por fornecer os endpoints da aplicação. Utilizando a arquitetura e estrutura de pastas padrão do framework Nestjs.
- **web/**: Contém o frontend, responsável pela interface do usuário.

Essa separação permite um desenvolvimento desacoplado, facilitando a manutenção e escalabilidade da aplicação.

## Lista de Bibliotecas de Terceiros Utilizadas

### Backend (`api/`)

- **NestJS**: Framework backend.
- **TypeORM**: ORM para banco de dados.
- **JWT**: Autenticação.
- **Docker**: Containerização.
- **Jest**: Testes unitários.
- **Swagger**: Documentação.

### Frontend (`web/`)

- **Vue.js**: Framework frontend.
- **Vuetify**: Biblioteca de componentes UI.

## O que eu faria se tivesse mais tempo

- Com certeza trabalharia na separação de responsabilidades do frontend, em uma melhor estrutura de pastas (services, pages, components, modals etc)
- Melhorar a estilização ta tabela e o sidebar
- Faria o processo de lougout tanto back quanto frontend
- Teste de integração subindo uma imagem docker do node, banco, seeders para inicializar os dados principais

## Quais requisitos obrigatórios não foram entregues

- Não realizei o processo de commits por parte do front, pois eu precisei alterar o projeto algumas vezes, visto que nunca trabalhei com vue e nem vuetify
- Se tratavam de telas para cadastro/edição e não apenas modais, foi um equivoco meu
