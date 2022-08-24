import express, { Request, Response, NextFunction } from 'express';
import router from './routes'

process.on('SIGTERM', () => {
  process.exit();
});

const app = express();

const accessControl = (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT, PATCH');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};

app.use(express.json());
app.use(accessControl);

app.use(router);

app.get("/", (_req, res) => {
  return res.json({ message: 'Server Working'});
});

app.listen(3000);