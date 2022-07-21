require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT;

const errorHandler = require('./shared/errors/errorHandler');

app.use(express.json());
app.use(errorHandler);

app.get('/status', (req, res) => {
  res.json({ message: 'API online!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
