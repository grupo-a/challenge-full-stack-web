Documentação da Arquitetura da Solução da API Node.js

Visão Geral

A API backend em Node.js é responsável por fornecer endpoints para o CRUD de alunos e fazer a interação com os recursos da aplicação. Ela segue uma arquitetura que utiliza o framework Express.js para facilitar a criação de APIs RESTful. Além disso, foram adicionadas algumas bibliotecas para segurança (Helmet), manipulação de logs (Morgan), autorização (JsonWebToken), entre outras funcionalidades.

Tecnologias Utilizadas

Node.js: Plataforma de execução de código JavaScript.
Express.js: Framework web para Node.js que facilita a criação de APIs RESTful.
Axios: Cliente HTTP para fazer requisições a outros serviços.
Cors: Middleware para habilitar o CORS (Cross-Origin Resource Sharing).
Dotenv: Carrega variáveis de ambiente de um arquivo .env para o processo do Node.js.
Helmet: Middleware para configurar cabeçalhos HTTP de forma segura.
JsonWebToken: Implementação de JWT para autenticação.
Lodash: Biblioteca de utilitários JavaScript.
Morgan: Middleware para log de solicitações HTTP.
Nodemon: Utilitário para reiniciar automaticamente o servidor quando o código é alterado.
Pg: Cliente PostgreSQL para Node.js.
Sha256: Implementação de SHA-256 em JavaScript.
Jest: Framework de teste para JavaScript.

Estrutura de Diretórios

A estrutura de diretórios da aplicação segue o seguinte padrão:

- src/
  - bll/           # Regra de négocios da aplicação 
  - cofig/         # Conexão com o Banco de Dados
  - controllers/   # Controladores da aplicação
  - middlewares/   # Middlewares da aplicação
  - models/        # Modelos de dados da aplicação
  - routes/        # Rotas da API
  - test/          # Testes automatizados
  - utils/         # Funções complementares Globais
- index.js         # Ponto de entrada da aplicação
- .env             # Arquivo de variáveis de ambiente
- package.json     # Arquivo de configuração do npm
- jest.config.js   # Arquivo de configuração do jest

Arquitetura da Aplicação

A aplicação segue uma arquitetura baseada em rotas, controladores, blls e  modelos :

Rotas

As rotas da API são definidas na pasta routes/.
Cada arquivo de rota agrupa endpoints relacionados.
Utiliza o Express.js para definir as rotas e chamar os controladores apropriados.

Controladores

Os controladores são definidos na pasta controllers/.
Cada controlador é responsável por lidar com as requisições HTTP, chamar os blls necessários e retornar as respostas apropriadas.
Eles não devem conter lógica de negócio, que é delegada aos blls.


Blls

Os Blls da aplicação são definidos na pasta bll/.
Cada Bll é responsável por lidar com as requisições HTTP, chamar os modelos necessários e retornar as respostas apropriadas.
Eles devem conter lógica de negócio, que é delegada as models.

Modelos

Os modelos de dados são definidos na pasta models/.
Cada modelo representa uma entidade de negócio da aplicação.
Eles são responsáveis por definir a estrutura dos dados e as operações relacionadas ao banco de dados.

Middlewares

Os middlewares da aplicação são definidos na pasta middlewares/.
Eles são utilizados para tratar solicitações HTTP antes de serem passadas para os controladores.
Testes Automatizados
Os testes automatizados são escritos usando o framework Jest e são definidos na pasta test/. Eles abrangem tanto os testes unitários quanto os testes de integração para garantir a qualidade do código.

Executando a Aplicação

Para executar a aplicação localmente, siga estas etapas:

Certifique-se de ter o Node.js e o PostgreSQL instalados em sua máquina.
Clone o repositório do projeto.
Configure as variáveis de ambiente no arquivo .env.
Instale as dependências do projeto executando npm install na raiz do projeto.
Inicie o servidor executando npm start.
Acesse a API através do URL fornecido pelo servidor.

Conclusão

Esta documentação fornece uma visão geral da arquitetura da solução da API Node.js, destacando a estrutura de diretórios, padrões de design e tecnologias utilizadas. Essa arquitetura foi projetada visando a escalabilidade, manutenibilidade e facilidade de desenvolvimento.

O que você melhoraria se tivesse mais tempo.

Com mais tempo, teria melhorado a autenticação, tratado erros unitáriamente e melhoraria os testes feitos. 

Quais requisitos obrigatórios que não foram entregues.

Entendo que todos os requisitos obrigátorios foram entregues. 
