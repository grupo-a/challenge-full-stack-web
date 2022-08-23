import express from 'express';
import router from './routes'

process.on('SIGTERM', () => {
  process.exit();
});

const app = express();

app.use(express.json());

app.use(router);

app.get("/", (_req, res) => {
  return res.json({ message: 'Server Working'});
});

app.listen(3000);