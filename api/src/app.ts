import express, { json, Express } from 'express';
import cors from 'cors';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';

class App {
  express: Express;
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  middlewares() {
    this.express.use(cors());
    this.express.use(json());
  }

  routes() {
    this.express.use(routes);
  }

  errorHandler() {
    this.express.use(errorHandler);
  }
}

export default new App().express;
