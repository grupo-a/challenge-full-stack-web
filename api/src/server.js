import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';

const app = express();
const PORT = process.env.PORT;

import errorHandler from './shared/errors/errorHandler.js';

app.use(express.json());
app.use(errorHandler);

app.get('/status', (req, res) => {
  res.json({ message: 'API online!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
