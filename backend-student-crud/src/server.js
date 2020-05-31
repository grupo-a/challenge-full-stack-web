require('./config/env');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const winston = require('./config/winston');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const db = require('./app/models');

class Server {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV === 'development';
    this.isTest = process.env.NODE_ENV === 'test';

    this.middlewares();
    this.database();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(helmet());
    this.express.use(cors());

    if (!this.isTest) {
      this.express.use(morgan('combined', { stream: winston.stream }));

      // swagger config
      this.express.use(
        '/docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument),
      );
    }
  }

  database() {
    db.sequelize
      .authenticate()
      .then(() => {
        console.log('Banco conectado!');
      })
      .catch((err) => {
        console.error('Erro de conexão com o banco!', err);
      });
  }

  routes() {
    this.express.use(require('./routes'));
  }
}

module.exports = new Server().express;
