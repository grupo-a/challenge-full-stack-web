require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
app.use(express.json());

const errorHandler = require('./shared/errors/errorHandler');
const Student = require('./controllers/StudentController');

app.get('/status', (req, res) => {
  res.json({ message: 'API online!' });
});

app.post('/student', Student.store);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
