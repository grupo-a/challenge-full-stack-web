//cria um serviço de http
const http = require('http');
// importa o app
const app = require('./app');
// define uma porta padrão
const port = process.env.PORT || 3000;
// cria nosso server
const server = http.createServer(app);
// escuta o app na porta
server.listen(port);