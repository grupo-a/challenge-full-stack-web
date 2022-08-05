# Seja Muito Bem Vindo!!!

## TECNOLOGIAS UTILIZADAS
<ul>
  <li>Vue</li>
  <li>Dotenv</li>
  <li>Axios</li>
  <li>Node.js</li>
  <li>Express</li>
  <li>MySql</li>
  <li>Mocha | Chai | Sinon.js </li>
</ul>

# Instruções para iniciar o projeto

1.
  * Instale as dependências:
    * `npm install`
  * Inicialize o projeto:
    * `npm start`

## Rodando os testes
1. Teste Back-end
    * cd back-end 
    * npm run test

## Configurando variável de ambiente API
  * Crie um arquivo .env e informe nele a URL do banco
  ``` REACT_APP_API_URL=https://.... ```
<p>
  Se não foi informado por padão será utilizado 'http://localhost:3001'
</p>

**⚠️ IMPORTANTE! ⚠️**
# Configurações necessárias para o Back-End

### Conexão com o Banco:

**⚠️ IMPORTANTE! ⚠️**

```javascript
const connection = mysql.createPool({
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
});
```
Para rodar corretamente, na raiz do projeto **renomeie o arquivo `.env.example` para `.env`** com as variáveis de ambiente. Por exemplo, caso o seu usuário SQL seja `nome` e a senha `1234` seu arquivo ficará desta forma:

```sh
MYSQL_HOST=localhost
MYSQL_USER=nome
MYSQL_PASSWORD=1234
PORT=3001
```
