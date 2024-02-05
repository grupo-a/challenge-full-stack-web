# Comentários

## Decisão sobre a arquitetura utilizada

## Backend

- **API:** Utilizei Nest.js para o backend por ser um framework bastante robusto e de fácil escalabilidade além de ser bastante adaptável e ter por padrão varias tecnologias que pode ser facilmente integradas ao seu ecossistema. Alem do Nest.js tambem utilizei o Sequelize ORM para comunicação com banco de dados por ser amplamente utilizado no mercado e pela minha familaridade com o ORM.

- **Banco de Dados:** Escolhi MySQL pela seu desempenho e eficiente em leitura e gravação, atendendo às necessidades do sistema.

## Frontend

- **Framework JS:** Escolhi Vue.js devido à sua facilidade de integração com Vuetify e pela sua flexibilidade na construção de interfaces interativas.

- **Framework de UI:** Optei por Vuetify para garantir uma aparência consistente e componentes prontos para uso e a produtividade.


## Lista de bibliotecas de terceiros utilizadas

No Backend:
- Nest.js.
- Sequelize
- class-validator
- passport,
- jwt,
- bcrypt

No Frontend:
- Vue.js 3
- Vuetify
- vue-router
- pinia,
- vite,
- unplugin-vue-components,
- unplugin-vue-router,
- unplugin-auto-import,

## O que seria melhorado se tivesse mais tempo?

Se tivesse mais tempo, algumas melhorias que poderiam ser feitas no projeto são:

- Escrever testes de integração e E2E no backend para garantir ainda mais a qualidade do código
- Escrever todos os teste no frontend 
- Melhorar a interface do usuário para torná-la mais intuitiva e amigável.
- Melhorar ciclo de feedback ao usuário no frontend
- Realizar uma pipeline de CI/CD para teste do código e deploy automático
- Realizar uma documentação da api utilizando bibliotecas como Swigger para fica fácil entendimento
- Otimizar o desempenho da aplicação, identificando e corrigindo possíveis gargalos.

## Requisitos obrigatórios não entregues

Todos os requisitos obrigatórios foram entregue com alguns itens a mais como autenticação e autorização de forma simples e documentação da arquitetura feita em diagrama C4 (https://drive.google.com/file/d/1d_8FXrjkE0XxgVTU3vm62WlkWPORg-zn/view?usp=sharing , https://drive.google.com/file/d/1d_8FXrjkE0XxgVTU3vm62WlkWPORg-zn/view?usp=sharing, https://drive.google.com/file/d/1d_8FXrjkE0XxgVTU3vm62WlkWPORg-zn/view?usp=sharing). Realizei teste unitarios no backend porem não realizei no frontend por questões de tempo.


## Instalação 

O app foi construindo utilizando Docker para executar instalação basta: 

```bash
  $ git clone https://github.com/dihgo01/challenge-full-stack-web.git

  $ cd challenge-full-stack-web/backend

  $ docker compose build

  $ docker compose up -d
  
  curl http://localhost:3333
```
a instalação do backend esta pronta agora vamos instalar o frontend

```bash
  $ cd challenge-full-stack-web/frontend
  $ COPY env.example .env
  $ docker compose build
  $ docker compose up -d

  curl http://localhost:3000
```
Lembrando que no arquivo ".env" você deve colocar a url do backend

## Rodando App

Para rodar o app você pode utilizar o container ou manualmente com os comandos:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Para rodar o frontend manualmente :
```bash
# development
$ npm run dev

```

## Rodando os Testes

```bash
# unit tests
$ npm run test
```


