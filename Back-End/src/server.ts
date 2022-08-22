import express from 'express';

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  return res.json({ message: 'Server Working'});
});

app.listen(3000);