import express, { json, Express } from 'express';
import cors from 'cors';
import routes from './routes';

class App {
  express: Express;
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(cors());
    this.express.use(json());
  }

  routes() {
    this.express.use(routes);
  }
}

export default new App().express;
